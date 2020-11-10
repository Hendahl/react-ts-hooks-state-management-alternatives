import * as t from "../../ts/types";

export const addTodo: t.AddTodo = (title) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.ADD_TODO, title: title });
  };
};

export const deleteTodo: t.DeleteTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.DELETE_TODO, id: todo.id });
  };
};

export const deleteTodos: t.DeleteTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.DELETE_TODOS });
  };
};

export const editTodo: t.EditTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.EDIT_TODO, todo: todo });
  };
};

export const filterTodos: t.FilterTodos = (visibilityFilter) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.FILTER_TODOS,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const getTodos: t.GetTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.GET_TODOS });
  };
};

export const saveTodo: t.SaveTodo = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SAVE_TODO });
  };
};

export const searchTodos: t.SearchTodos = (searchTerm) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SEARCH_TODOS, searchTerm: searchTerm });
  };
};

export const showEdit: t.ShowEdit = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SHOW_EDIT, todo: todo });
  };
};

export const showSearch: t.ShowSearch = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SHOW_SEARCH });
  };
};

export const toggleTodo: t.ToggleTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TOGGLE_TODO, todo: todo });
  };
};

export const toggleTodos: t.ToggleTodos = (isAllCompleted) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.TOGGLE_TODOS,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateTodos: t.UpdateTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.UPDATE_TODOS });
  };
};
