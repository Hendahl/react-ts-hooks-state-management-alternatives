import * as actions from "../../constants/actions";

export const saveTodo: SaveTodo = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SAVE_TODO });
  };
};

export const editingTodo: EditingTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDITING_TODO, todo: todo });
  };
};

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

export const changeTodoCompleted: ChangeTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.CHANGE_TODO_COMPLETED, todo: todo });
  };
};

export const changeTodoTitle: ChangeTodo = (todo) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.CHANGE_TODO_TITLE, todo: todo });
  };
};

export const changeTodosCompleted: ChangeTodos = (completed) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.CHANGE_TODOS_COMPLETED,
      isAllCompleted: completed,
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
