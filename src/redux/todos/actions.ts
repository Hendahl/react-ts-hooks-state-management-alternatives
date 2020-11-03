import * as types from "../../ts/types";

export const addTodo: AddTodo = (title) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.ADD_TODO, title: title });
  };
};

export const deleteTodo: DeleteTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.DELETE_TODO, id: todo.id });
  };
};

export const deleteTodos: DeleteTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.DELETE_TODOS });
  };
};

export const editTodo: EditTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.EDIT_TODO, todo: todo });
  };
};

export const filterTodos: FilterTodos = (visibilityFilter) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.FILTER_TODOS,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const getTodos: GetTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.GET_TODOS });
  };
};

export const saveTodo: SaveTodo = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.SAVE_TODO });
  };
};

export const searchTodos: SearchTodos = (searchTerm) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.SEARCH_TODOS, searchTerm: searchTerm });
  };
};

export const showEdit: ShowEdit = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.SHOW_EDIT, todo: todo });
  };
};

export const showSearch: ShowSearch = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.SHOW_SEARCH });
  };
};

export const toggleTodo: ToggleTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.TOGGLE_TODO, todo: todo });
  };
};

export const toggleTodos: ToggleTodos = (isAllCompleted) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.TOGGLE_TODOS,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateTodos: UpdateTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.UPDATE_TODOS });
  };
};
