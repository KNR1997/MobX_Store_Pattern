import Store from "./base/Store";
import CourseModel from "@/models/Course";

export default class CoursesStore extends Store<CourseModel> {
  constructor(rootStore: any) {
    super(rootStore, CourseModel);
  }

  getByDocumentId(id: string) {
    return this.ordered.filter((e) => e.documentId === id);
  }
}
