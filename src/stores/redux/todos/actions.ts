import * as t from "../../../ts/types";

export const addTodo: t.AddTodo = (title) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.ADD, title: title });
  };
};

export const removeTodo: t.RemoveTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.REMOVE, id: todo.id });
  };
};

export const removeTodos: t.RemoveTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.REMOVE_ALL });
  };
};

export const editTodo: t.EditTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.EDIT, todo: todo });
  };
};

export const filterTodos: t.FilterTodos = (visibilityFilter) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.FILTER,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const getTodos: t.GetTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.GET });
  };
};

export const saveTodo: t.SaveTodo = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SAVE });
  };
};

export const searchTodos: t.SearchTodos = (searchTerm) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SEARCH, searchTerm: searchTerm });
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
    dispatch({ type: t.TOGGLE, todo: todo });
  };
};

export const toggleTodos: t.ToggleTodos = (isAllCompleted) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.TOGGLE_ALL,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateTodos: t.UpdateTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.UPDATE });
  };
};
