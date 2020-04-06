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
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
};

type AddState = {
  isAllCompleted: boolean;
  title: string;
};
type EditState = {
  isEditing: boolean;
  title: string;
};

type Add = (title: string) => void;
type Delete = (todo: Todo) => void;
type DeleteAll = () => void;
type Dispatch = (arg0: Action) => void;
type Edit = (todo: Todo) => void;
type Edit = (todo: Todo) => void;
type EditAll = (completed: boolean) => void;
type Filter = (visibiltityFilter: string) => void;
type Get = () => void;
type Update = () => void;
type Dialog = (todo: Todo) => void;

type Action =
  | { type: "ACTIVE_TODOS" }
  | { type: "ADD_TODO"; title: string }
  | { type: "ALL_TODOS" }
  | { type: "COMPLETED_TODOS" }
  | { type: "DELETE_TODO"; id: number }
  | { type: "DELETE_TODOS" }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "TOGGLE_TODOS"; isAllCompleted: boolean }
  | { type: "GET_TODOS" }
  | { type: "SET_FILTER"; visibiltityFilter: string }
  | { type: "UPDATE_TODOS" };
