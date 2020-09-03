class LocalStorageHelper {
  getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }
  SetItem(key: string, obj: unknown) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

export default new LocalStorageHelper();