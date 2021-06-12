import React from "react";
import { IItem } from "../../interfaces";

type TodoListProps = {
  data: IItem[];
};

export const ListItems: React.FC<TodoListProps> = ({ data }) => {
  if (data.length === 0) {
    return <p className="center">Items not found</p>;
  }

  return <ul></ul>;
};
