type Classes = {
  listItem: string;
  listItemText: string;
  title: string;
  titleCompleted: string;
};

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

type AddTodo = (title: string) => void;
type DeleteTodo = (todo: Todo) => void;
type DeleteTodos = () => void;
type EditTodo = (todo: Todo) => void;
type FilterTodos = (visibiltityFilter: string) => void;
type SaveTodo = () => void;
type SearchTodos = (searchTerm: string) => void;
type ShowEdit = (todo: Todo) => void;
type ShowShearch = () => void;
type ToggleTodo = (todo: Todo) => void;
type ToggleTodos = (isAllCompleted: boolean) => void;
