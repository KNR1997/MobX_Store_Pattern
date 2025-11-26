import CoursesStore from "./CoursesStore";

export default class RootStore {
  courses: CoursesStore;

  constructor() {
    this.courses = new CoursesStore(this);
  }

  clear() {
    Object.values(this).forEach((store: any) => {
      if (store.clear) store.clear();
    });
  }
}
