export interface ResponseError {
  error: string;
  success: false;
}

export interface ResponseItem<T> {
  data: T;
  success: true;
}

export interface ResponseList<T> {
  list: Array<T>;
  count: number;
}