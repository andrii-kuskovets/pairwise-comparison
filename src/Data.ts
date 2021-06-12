import { IData, IGrid, IItem } from "./interfaces";
import { ComparisonGrid } from "./ComparisonGrid";

export class Data implements IData {
  grid: IGrid = new ComparisonGrid(0);
  items: IItem[] = [];

  copy(other: Data): void {
    this.grid = new ComparisonGrid(other.grid.values.length);
    this.grid.copy(other.grid);
    this.items = other.items;
  }
}
