type ReduxAction =
  | { type: "ADD_TODO"; title: string }
  | { type: "DELETE_TODO"; id: number }
  | { type: "DELETE_TODOS" }
  | { type: "EDIT_TODO"; todo: Todo }
  | { type: "FILTER_TODOS"; visibiltityFilter: string }
  | { type: "GET_TODOS" }
  | { type: "SAVE_TODO" }
  | { type: "SEARCH_TODOS"; searchTerm: string }
  | { type: "SHOW_EDIT"; todo: Todo }
  | { type: "SHOW_SEARCH" }
  | { type: "TOGGLE_TODO"; todo: Todo }
  | { type: "TOGGLE_TODOS"; isAllCompleted: boolean }
  | { type: "UPDATE_TODOS" };

type AddTodo = (title: string) => void;
type DeleteTodo = (todo: Todo) => void;
type DeleteTodos = () => void;
type Dispatch = (arg: Action) => void;
type EditTodo = (todo: Todo) => void;
type FilterTodos = (visibiltityFilter: string) => void;
type GetTodos = () => void;
type SaveTodo = () => void;
type SearchTodos = (searchTerm: string) => void;
type ShowEdit = (todo: Todo) => void;
type ShowSearch = () => void;
type ToggleTodo = (todo: Todo) => void;
type ToggleTodos = (completed: boolean) => void;
type UpdateTodos = () => void;
