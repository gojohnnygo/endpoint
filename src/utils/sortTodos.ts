import { Todo } from "../types";

/**
 * Takes an array of Todos and sorts by overdue, current and complete by due
 * date.
 * @param todos
 * @returns
 */
const sortTodos = (todos: Todo[]) => {
  const overdueWithDueDate = todos
    .filter(
      (todo) =>
        !todo.isComplete &&
        todo.dueDate &&
        Date.now() > new Date(todo.dueDate).getTime()
    )
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  const incompleteWithDueDate = todos
    .filter(
      (todo) =>
        !todo.isComplete &&
        todo.dueDate &&
        Date.now() < new Date(todo.dueDate).getTime()
    )
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  const incompleteWithOutDueDate = todos.filter(
    (todo) => !todo.isComplete && !todo.dueDate
  );

  const completedWithDueDate = todos
    .filter((todo) => todo.isComplete && todo.dueDate)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  const completedWithOutDueDate = todos.filter(
    (todo) => todo.isComplete && !todo.dueDate
  );

  return [
    ...overdueWithDueDate,
    ...incompleteWithDueDate,
    ...incompleteWithOutDueDate,
    ...completedWithDueDate,
    ...completedWithOutDueDate,
  ];
};

export default sortTodos;
