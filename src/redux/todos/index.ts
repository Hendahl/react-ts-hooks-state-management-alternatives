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
    case actions.CHANGE_TODO_COMPLETED: {
      return utils.changeTodoCompleted(todos, action.todo);
    }
    case actions.CHANGE_TODO_TITLE: {
      return utils.changeTodoTitle(todos, action.todo);
    }
    case actions.CHANGE_TODOS_COMPLETED: {
      return utils.changeTodosCompleted(todos, action.isAllCompleted);
    }
    case actions.DELETE_TODO: {
      return utils.deleteTodo(todos, action.id);
    }
    case actions.DELETE_TODOS: {
      return utils.deleteTodos();
    }
    case actions.EDITING_TODO: {
      return utils.editingTodo(todos, action.todo);
    }
    case actions.GET_TODOS: {
      return utils.getStoredTodos();
    }
    case actions.SAVE_TODO: {
      return utils.saveTodoTitle(todos);
    }
    case actions.SET_FILTER: {
      return utils.setFilter(todos, action.visibiltityFilter);
    }
    case actions.SEARCH_TODOS: {
      return utils.searchTodos(todos, action.searchTerm);
    }
    case actions.SEARCH_TOGGLE: {
      return utils.searchToggle(todos);
    }
    case actions.UPDATE_TODOS: {
      return utils.updateTodos(todos);
    }
    default:
      return todos;
  }
}
