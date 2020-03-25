type Classes = {
  listItem: string;
  title: string;
  titleCompleted: string;
  listItemText: string;
};

type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

type Todos = {
  visibilityFilter: string;
  payload: Todo[];
  countAll: number;
  countCompleted: number;
  isUpdating: boolean;
  visible: Todo[];
};

type AddState = {
  title: string;
  isAllCompleted: boolean;
};

type Add = (title: string) => void;
type Filter = (filter: string) => void;
type Delete = (todo: Todo) => void;
type DeleteAll = () => void;
type Edit = (todo: Todo) => void;
type EditAll = (completed: boolean) => void;

type Action =
  | { type: "ACTIVE_TODOS" }
  | { type: "ADD_TODO"; title: string }
  | { type: "ALL_TODOS" }
  | { type: "COMPLETED_TODOS" }
  | { type: "DELETE_TODO"; id: number }
  | { type: "DELETE_TODOS" }
  | { type: "EDIT_TODO"; id: number }
  | { type: "EDIT_TODOS"; completed: boolean }
  | { type: "GET_TODOS" }
  | { type: "SET_FILTER"; filter: string }
  | { type: "UPDATE_TODOS" };
