export interface SimpleModel<T> {
  label: string;
  value: T;
}

export interface CountableModel<T> extends SimpleModel<T> {
  count: number;
}
