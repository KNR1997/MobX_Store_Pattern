import { CourseInput, Course } from "@/types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./curd-factory";

export const courseClient = {
  ...crudFactory<Course, any, CourseInput>(API_ENDPOINTS.COURSES),
};
