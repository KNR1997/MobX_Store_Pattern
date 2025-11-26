import { observable, action, computed, runInAction } from "mobx";
import pluralize from "pluralize";
import lowerFirst from "lodash/lowerFirst";
import { api } from "@/utils/api";
import Model from "@/models/base/Model";

export default abstract class Store<T extends Model> {
  @observable data = new Map<string, T>();
  @observable isFetching = false;
  @observable isSaving = false;
  @observable isLoaded = false;

  model: any;
  modelName: string;
  apiEndpoint: string;
  rootStore: any;

  constructor(rootStore: any, modelClass: any) {
    this.rootStore = rootStore;
    this.model = modelClass;
    this.modelName = modelClass.modelName;
    this.apiEndpoint = pluralize(lowerFirst(modelClass.modelName));
  }

  @action
  add(item: any): T {
    const ModelClass = this.model;

    let instance = this.data.get(item.id);
    if (instance) {
      instance.updateData(item);
      return instance;
    }

    instance = new ModelClass(item, this);
    this.data.set(instance.id, instance);
    return instance;
  }

  @action
  remove(id: string) {
    this.data.delete(id);
  }

  get(id: string): T | undefined {
    return this.data.get(id);
  }

  /** Fake API list fetch */
  @action
  async fetchAll() {
    this.isFetching = true;
    try {
      console.log('this.apiEndpoint----------: ', this.apiEndpoint)
      const res = await api.get(`/${this.apiEndpoint}`);
      console.log('res--------: ', res)
      runInAction(() => {
        res.data.forEach((item: any) => this.add(item));
        this.isLoaded = true;
      });
    } finally {
      this.isFetching = false;
    }
  }

  @action
  async save(params: any) {
    this.isSaving = true;
    try {
      const res = await api.post(`/${this.apiEndpoint}`, params);
      return runInAction(() => this.add(res));
    } finally {
      this.isSaving = false;
    }
  }

  @action
  async delete(item: T) {
    await api.delete(`/${this.apiEndpoint}/${item.id}`);
    this.remove(item.id);
  }

  @computed
  get ordered() {
    return Array.from(this.data.values()).sort(
      (a, b) => +new Date(b.createdAt || 0) - +new Date(a.createdAt || 0)
    );
  }
}
