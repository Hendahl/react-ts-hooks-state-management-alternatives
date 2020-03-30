import * as actions from "../../constants/actions";

export const addTodo: Add = title => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.ADD_TODO, title: title });
  };
};

export const deleteTodo: Delete = todo => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.DELETE_TODO, id: todo.id });
  };
};

export const deleteTodos: DeleteAll = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.DELETE_TODOS });
  };
};

export const editTodo: Edit = todo => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDIT_TODO, id: todo.id });
  };
};

export const editTodos: EditAll = completed => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDIT_TODOS, isAllCompleted: completed });
  };
};
export const getTodos: Get = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_TODOS });
  };
};

export const updateTodos: Update = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.UPDATE_TODOS });
  };
};

export const setFilter: Filter = visibilityFilter => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SET_FILTER, visibiltityFilter: visibilityFilter });
  };
};
