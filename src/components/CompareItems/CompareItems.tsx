import React, { useEffect, useState } from "react";
import { ICompareItem, IData } from "../../interfaces";
import "./_compareItem.scss";

type CompareItemsProps = {
  data: IData;
  getCompareItems(firstId: string, secondId: string, isItemMore: boolean): void;
};

export const CompareItems: React.FC<CompareItemsProps> = ({
  data,
  getCompareItems,
}) => {
  const [pairs, setPairs] = useState<ICompareItem[]>([]);

  const generatePairs = () => {
    let comparedData: ICompareItem[] = [];

    for (let i: number = 0; i < data.items.length; i++) {
      for (let j: number = i + 1; j < data.items.length; j++) {
        const left = data.items[i];
        const right = data.items[j];

        comparedData.push({
          [left.value]: data.grid.isGreater(left.idx, right.idx),
          [right.value]: data.grid.isGreater(right.idx, left.idx),
        });
      }
    }
    setPairs(comparedData);
  };

  useEffect(generatePairs, [data]);

  return (
    <div className="items">
      <h2>Compare items</h2>
      {pairs.map((item, idx) => (
        <div className="item" key={idx}>
          <button
            onClick={getCompareItems.bind(
              null,
              Object.keys(item)[0],
              Object.keys(item)[1],
              true
            )}
            className={
              item[Object.keys(item)[0]]
                ? "item__btn item__btn_success"
                : "item__btn"
            }
          >
            {Object.keys(item)[0]}
          </button>
          <button
            onClick={getCompareItems.bind(
              null,
              Object.keys(item)[0],
              Object.keys(item)[1],
              false
            )}
            className={
              item[Object.keys(item)[1]]
                ? "item__btn item__btn_success"
                : "item__btn"
            }
          >
            {Object.keys(item)[1]}
          </button>
        </div>
      ))}
    </div>
  );
};
