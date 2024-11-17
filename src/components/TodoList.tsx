import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Todo } from "../types";
import sortTodos from "../utils/sortTodos";
import TodoListItem from "./TodoListItem";

const GET_URL =
  "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/get";
const OPTIONS = {
  method: "GET",
};

const TodoList = () => {
  const [{ data, error, isLoading }, fetchData] = useFetch<Todo[]>(GET_URL);

  useEffect(() => {
    fetchData(OPTIONS);
  }, [fetchData]);

  if (error) {
    return <div>Oops, something went wrong. Try again.</div>;
  }

  if (isLoading) {
    return <div>...loading...</div>;
  }
  const sortedTodos = sortTodos(data || []);

  return (
    <div className="TodoList">
      {sortedTodos.map((todo) => (
        <TodoListItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
