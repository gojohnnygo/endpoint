import classNames from "classnames";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Todo, TodoStatus } from "../types";
import formatDate from "../utils/formatDate";

const OPTIONS = {
  method: "PATCH",
};

const TodoListItem = ({ description, dueDate, id, isComplete }: Todo) => {
  const [isChecked, setIsChecked] = useState(isComplete);
  const isOverdue = dueDate && Date.now() > new Date(dueDate).getTime();

  const [{ data, error, isLoading }, fetchData] = useFetch<TodoStatus>(
    `https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/patch/${id}`
  );

  const handleOnInputChange = () => {
    fetchData({
      body: JSON.stringify({ isComplete: !isChecked }),
      ...OPTIONS,
    });
  };

  useEffect(() => {
    if (data?.status === "success") {
      setIsChecked((prevState) => !prevState);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert("Something went wrong. Try again.");
    }
  }, [error]);

  return (
    <div
      className={classNames("TodoListItem", {
        complete: isComplete,
        overdue: !isComplete && isOverdue,
      })}
    >
      <div>
        <input
          className="TodoListItem-input"
          checked={isChecked}
          onChange={handleOnInputChange}
          type="checkbox"
        />
        <span
          className={classNames("TodoListItem-description", {
            strikethrough: isChecked,
          })}
        >
          {description}
          {isLoading && ` (saving)`}
        </span>
      </div>
      <span className={classNames({ "TodoListItem-date": Boolean(dueDate) })}>
        {formatDate(dueDate)}
      </span>
    </div>
  );
};

export default TodoListItem;
