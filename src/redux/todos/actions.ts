import * as actions from "../../constants/actions";

export const addTodo: AddTodo = (title) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.ADD_TODO, title: title });
  };
};

export const saveTodoTitle: SaveTodo = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SAVE_TODO });
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

export const editingTodo: Editing = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDITING_TODO, todo: todo });
  };
};

export const changeTodoCompleted: EditTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.CHANGE_TODO_COMPLETED, todo: todo });
  };
};

export const changeTodoTitle: EditTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.CHANGE_TODO_TITLE, todo: todo });
  };
};

export const changeTodosCompleted: ChangeTodos = (isAllCompleted) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.CHANGE_TODOS_COMPLETED,
      isAllCompleted: isAllCompleted,
    });
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

export const searchToggle: SearchToggle = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SEARCH_TOGGLE });
  };
};

export const searchTodos: SearchTodos = (searchTerm) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SEARCH_TODOS, searchTerm: searchTerm });
  };
};
