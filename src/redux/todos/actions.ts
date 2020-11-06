import * as types from "../../ts/types";

export const addTodo: types.AddTodo = (title) => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.ADD_TODO, title: title });
  };
};

export const deleteTodo: types.DeleteTodo = (todo) => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.DELETE_TODO, id: todo.id });
  };
};

export const deleteTodos: types.DeleteTodos = () => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.DELETE_TODOS });
  };
};

export const editTodo: types.EditTodo = (todo) => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.EDIT_TODO, todo: todo });
  };
};

export const filterTodos: types.FilterTodos = (visibilityFilter) => {
  return (dispatch: types.Dispatch) => {
    dispatch({
      type: types.FILTER_TODOS,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const getTodos: types.GetTodos = () => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.GET_TODOS });
  };
};

export const saveTodo: types.SaveTodo = () => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.SAVE_TODO });
  };
};

export const searchTodos: types.SearchTodos = (searchTerm) => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.SEARCH_TODOS, searchTerm: searchTerm });
  };
};

export const showEdit: types.ShowEdit = (todo) => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.SHOW_EDIT, todo: todo });
  };
};

export const showSearch: types.ShowSearch = () => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.SHOW_SEARCH });
  };
};

export const toggleTodo: types.ToggleTodo = (todo) => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.TOGGLE_TODO, todo: todo });
  };
};

export const toggleTodos: types.ToggleTodos = (isAllCompleted) => {
  return (dispatch: types.Dispatch) => {
    dispatch({
      type: types.TOGGLE_TODOS,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateTodos: types.UpdateTodos = () => {
  return (dispatch: types.Dispatch) => {
    dispatch({ type: types.UPDATE_TODOS });
  };
};
