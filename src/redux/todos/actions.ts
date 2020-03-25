import * as actions from "../../constants/actions";

export const addTodo: Add = title => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.ADD_TODO, title: title });
  };
};

export const deleteTodo: Delete = todo => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.DELETE_TODO, id: todo.id });
  };
};

export const deleteTodos: DeleteAll = () => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.DELETE_TODOS });
  };
};

export const editTodo: Edit = todo => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.EDIT_TODO, id: todo.id });
  };
};

export const editTodos: EditAll = completed => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.EDIT_TODOS, completed: completed });
  };
};
export const getTodos = () => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.GET_TODOS });
  };
};

export const updateTodos = () => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.UPDATE_TODOS });
  };
};

export const setFilter: Filter = filter => {
  return (dispatch: (arg0: Action) => void) => {
    dispatch({ type: actions.SET_FILTER, filter: filter });
  };
};
