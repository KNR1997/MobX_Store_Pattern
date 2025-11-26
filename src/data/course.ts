import Router, { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { mapPaginatorData } from "@/utils/data-mappers";
import { courseClient } from "./client/course";
import { Routes } from "@/config/routes";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { Config } from "@/config";
import { CoursePaginator, CourseQueryOptions } from "@/types";

export const useCoursesQuery = (options: Partial<CourseQueryOptions>) => {
  const { data, error, isLoading } = useQuery<CoursePaginator, Error>(
    [API_ENDPOINTS.COURSES, options],
    ({ queryKey, pageParam }) =>
      courseClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    }
  );

  return {
    courses: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useCreateCouponMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  return useMutation(courseClient.create, {
    onSuccess: async () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.course.list}`
        : Routes.course.list;
      await Router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });
      toast.success(t("common:successfully-created"));
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
    },
  });
};

export const useUpdateCouponMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(courseClient.update, {
    onSuccess: async (data) => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.course.list}`
        : Routes.course.list;
      await router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });

      toast.success(t("common:successfully-updated"));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`));
    },
  });
};

export const useDeleteCouponMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(courseClient.delete, {
    onSuccess: () => {
      toast.success(t("common:successfully-deleted"));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
    },
  });
};
