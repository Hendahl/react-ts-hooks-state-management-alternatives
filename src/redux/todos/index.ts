import * as actions from "../../constants/actions";
import * as utils from "../../utils";

export default function reducer(
  todos = utils.getStoredTodos(),
  action: Action
): Todos {
  switch (action.type) {
    case actions.ADD_TODO: {
      return utils.addTodo(todos, action.title);
    }
    case actions.DELETE_TODO: {
      return utils.deleteTodo(todos, action.id);
    }
    case actions.DELETE_TODOS: {
      return utils.deleteTodos();
    }
    case actions.CHANGE_TODO: {
      return utils.editTodo(todos, action.id);
    }
    case actions.TOGGLE_TODOS: {
      return utils.editTodos(todos, action.isAllCompleted);
    }
    case actions.GET_TODOS: {
      return utils.getStoredTodos();
    }
    case actions.SET_FILTER: {
      return utils.setFilter(todos, action.visibiltityFilter);
    }
    case actions.UPDATE_TODOS: {
      return utils.updateTodos(todos);
    }
    default:
      return todos;
  }
}
