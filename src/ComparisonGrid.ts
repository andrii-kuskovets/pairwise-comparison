import { IGrid } from "./interfaces";

export class ComparisonGrid implements IGrid {
  constructor(size: number) {
    this.values = new Array<Array<number>>(size);
    for (let i = 0; i < size; ++i) {
      this.values[i] = new Array<number>(size);
      for (let j = 0; j < size; ++j) {
        this.values[i][j] = 0;
      }
    }
    for (let i = 0; i < size; ++i) {
      for (let j = i + 1; j < size; ++j) {
        this.values[i][j] = 1;
      }
    }
  }

  set(left: number, right: number, isLeftGreater: boolean): void {
    this.values[left][right] = isLeftGreater ? 1 : 0;
    this.values[right][left] = isLeftGreater ? 0 : 1;
  }

  isGreater(left: number, right: number): boolean {
    return this.values[left][right] === 1;
  }

  score(index: number): number {
    let result: number = 0;
    if (index >= this.values.length) return result;
    for (let i = 0; i < this.values[index].length; ++i) {
      result += this.values[index][i];
    }
    return result;
  }

  copy(other: IGrid): void {
    for (let i = 0; i < other.values.length; ++i) {
      for (let j = 0; j < other.values[i].length; ++j) {
        this.values[i][j] = other.values[i][j];
      }
    }
  }

  values: Array<Array<number>>;
}
