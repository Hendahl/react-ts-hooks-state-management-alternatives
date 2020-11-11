import * as t from "../../ts/types";

export const addTodo: t.AddTodo = (title) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODO_ADD, title: title });
  };
};

export const removeTodo: t.DeleteTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODO_DELETE, id: todo.id });
  };
};

export const removeTodos: t.DeleteTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODOS_DELETE });
  };
};

export const editTodo: t.EditTodo = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODO_EDIT, todo: todo });
  };
};

export const filterTodos: t.FilterTodos = (visibilityFilter) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.TODOS_FILTER,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const getTodos: t.GetTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODOS_GET });
  };
};

export const saveTodo: t.SaveTodo = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODO_SAVE });
  };
};

export const searchTodos: t.SearchTodos = (searchTerm) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODOS_SEARCH, searchTerm: searchTerm });
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
    dispatch({ type: t.TODO_TOGGLE, todo: todo });
  };
};

export const toggleTodos: t.ToggleTodos = (isAllCompleted) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.TODOS_TOGGLE,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateTodos: t.UpdateTodos = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TODOS_UPDATE });
  };
};
