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
type Delete = (todo: Todo) => void;
type DeleteAll = () => void;
type Edit = (todo: Todo) => void;
type EditAll = (completed: boolean) => void;
type Filter = (visibilityFilter: string) => void;
