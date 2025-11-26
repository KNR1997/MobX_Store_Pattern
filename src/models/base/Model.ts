import { observable, action } from "mobx";

export default abstract class Model {
  static modelName: string;

  @observable id: string;
  @observable createdAt?: string;
  @observable updatedAt?: string;

  store: any;

  constructor(data: any, store: any) {
    this.store = store;
    this.updateData(data);
  }

  @action
  updateData(data: any) {
    Object.assign(this, data);
  }

  save(params?: any) {
    return this.store.save({ ...params, id: this.id });
  }

  delete() {
    return this.store.delete(this);
  }
}
