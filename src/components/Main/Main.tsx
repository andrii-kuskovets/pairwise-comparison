import React, { useEffect, useState } from "react";
import { Form } from "../Form/Form";
import { IData, IItem } from "../../interfaces";
import { ListItems } from "../ListItems/ListItems";
import { CompareItems } from "../CompareItems/CompareItems";
import "./_main.scss";
import { ComparisonGrid } from "../../ComparisonGrid";
import { Data } from "../../Data";

export const Main: React.FC = () => {
  const [data, setData] = useState<IData>(new Data());
  const [winner, setWinner] = useState<number>(0);

  useEffect(() => {
    const saved = new Data();
    saved.copy(JSON.parse(localStorage.getItem("data") || "") as Data);
    setData(saved);
  }, []);

  useEffect(() => {
    setWinner(Math.max(...data.items.map((i) => data.grid.score(i.idx))));
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addHandler = (value: string) => {
    let duplicateItem: IItem | undefined = data.items.find(
      (item) => item.value === value
    );
    if (!duplicateItem) {
      let newData: Data = new Data();
      newData.grid = new ComparisonGrid(data.grid.values.length + 1);
      newData.grid.copy(data.grid);
      newData.items = data.items;
      const newItem: IItem = {
        value: value,
        idx: newData.grid.values.length - 1,
        id: Date.now(),
      };
      newData.items.push(newItem);
      setData(newData);
    }
  };

  const resetHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setData(new Data());
  };

  const getCompareItems = (
    leftId: string,
    rightId: string,
    isRightGreater: boolean
  ) => {
    const left = data.items?.find((item) => item.value === leftId)?.idx;
    const right = data.items?.find((item) => item.value === rightId)?.idx;

    if (left !== undefined && right !== undefined) {
      let newData: Data = new Data();
      newData.grid = new ComparisonGrid(data.grid.values.length);
      newData.grid.copy(data.grid);
      newData.items = data.items;
      newData.grid.set(left, right, isRightGreater);
      setData(newData);
    }
  };

  return (
    <div className="wrapper">
      <Form onAdd={addHandler} />
      <div className="results">
        <ListItems
          resetHandler={resetHandler}
          data={data}
          winnerItem={winner}
        />
        <CompareItems data={data} getCompareItems={getCompareItems} />
      </div>
    </div>
  );
};
