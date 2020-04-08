import * as actions from "../../constants/actions";

export const addTodo: AddTodo = (title) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.ADD_TODO, title: title });
  };
};

export const deleteTodo: DeleteTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.DELETE_TODO, id: todo.id });
  };
};

export const deleteTodos: DeleteTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.DELETE_TODOS });
  };
};

export const editTodo: ChangeTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.TOGGLE_TODO, id: todo.id });
  };
};

export const editTodos: ChangeTodos = (completed) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.TOGGLE_TODOS, isAllCompleted: completed });
  };
};
export const getTodos: GetTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_TODOS });
  };
};

export const updateTodos: UpdateTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.UPDATE_TODOS });
  };
};

export const setFilter: FilterTodos = (visibilityFilter) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SET_FILTER, visibiltityFilter: visibilityFilter });
  };
};
