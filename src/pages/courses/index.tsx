import { useCoursesQuery } from "@/data/course";
// import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SortOrder } from "@/types";
import { useStores } from "@/providers/StoresProvider";
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export default function Courses() {
  //   const { t } = useTranslation();
  const { locale } = useRouter();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { courses } = useStores();

  useEffect(() => {
    courses.fetchAll();
  }, []);

  // const { courses, loading, paginatorInfo, error } = useCoursesQuery({
  //   language: locale,
  //   limit: 20,
  //   page,
  //   orderBy,
  //   sortedBy,
  // });

  return (
    <div>
      <h2>Courses List Page</h2>
      <NextLink
              href="/products"
              className="w-full h-12 md:w-auto md:ms-6"
            >
              <span>Product Page</span>
            </NextLink>
      {/* {courses?.map((course) => (
        <h2>{course.name}</h2>
      ))} */}
      {/* {courses.ordered.map((evt) => (
        <div key={evt.id}>{evt.name}</div>
      ))} */}
    </div>
  );
}
