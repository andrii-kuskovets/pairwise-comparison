export interface IItem {
  value: string;
  idx: number;
  id: number;
}

export interface IGrid {
  isGreater(left: number, right: number): boolean;
  score(index: number): number;
  copy(other: IGrid): void;
  set(left: number, right: number, isLeftGreater: boolean): void;
  values: Array<Array<number>>;
}

export interface ICompareItem {
  [key: string]: boolean;
}

export interface IData {
  items: IItem[];
  grid: IGrid;
}
