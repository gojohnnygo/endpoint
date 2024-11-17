export interface Todo {
  description: string;
  dueDate: string;
  id: string;
  isComplete: boolean;
}

export interface TodoStatus {
  status: "success";
}

export interface UseFetch<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}
