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

export const editTodo: EditTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDIT_TODO, todo: todo });
  };
};

export const filterTodos: FilterTodos = (visibilityFilter) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.FILTER_TODOS,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const getTodos: GetTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_TODOS });
  };
};

export const saveTodo: SaveTodo = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SAVE_TODO });
  };
};

export const searchTodos: SearchTodos = (searchTerm) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SEARCH_TODOS, searchTerm: searchTerm });
  };
};

export const showEdit: ShowEdit = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SHOW_EDIT, todo: todo });
  };
};

export const showSearch: ShowSearch = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SHOW_SEARCH });
  };
};

export const toggleTodo: ToggleTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.TOGGLE_TODO, todo: todo });
  };
};

export const toggleTodos: ToggleTodos = (isAllCompleted) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.TOGGLE_TODOS,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateTodos: UpdateTodos = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.UPDATE_TODOS });
  };
};
