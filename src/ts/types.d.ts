type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

type Todos = {
  countAll: number;
  countCompleted: number;
  isSearching: boolean;
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
  editing: Todo[];
};
