import Model from "./base/Model";

export default class CourseModel extends Model {
  static modelName = "Course";

  documentId?: string;
  name?: string;
}
