import React from "react";
import { IData } from "../../interfaces";
import "./_listItems.scss";

type TodoListProps = {
  data: IData;
  resetHandler: (event: React.MouseEvent) => void;
  winnerItem: number;
};

export const ListItems: React.FC<TodoListProps> = ({
  data,
  resetHandler,
  winnerItem,
}) => {
  if (data.items.length === 0) {
    return <p className="center">Items not found</p>;
  }
  return (
    <div>
      <table className="table">
        <thead className="table__head">
          <tr>
            <th>Item</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {data.items.map((item) => (
            <tr key={item.id}>
              <td>{item.value}</td>
              <td>{data.grid.score(item.idx)}</td>
              <td
                className={
                  winnerItem === data.grid.score(item.idx)
                    ? "table__td-mark table__td-mark_show"
                    : "table__td-mark"
                }
              >
                <span>Winner</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-reset" onClick={(event) => resetHandler(event)}>
        Reset
      </button>
    </div>
  );
};
