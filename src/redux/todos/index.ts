import * as actions from "../../constants/actions";
import * as select from "../../selectors";

export default function reducer(
  todos = select.getStoredTodos(),
  action: Action
): Todos {
  switch (action.type) {
    case actions.ADD_TODO: {
      return select.addTodo(todos, action.title);
    }
    case actions.DELETE_TODO: {
      return select.deleteTodo(todos, action.id);
    }
    case actions.DELETE_TODOS: {
      return select.deleteTodos();
    }
    case actions.EDIT_TODO: {
      return select.editTodo(todos, action.id);
    }
    case actions.EDIT_TODOS: {
      return select.editTodos(todos, action.completed);
    }
    case actions.GET_TODOS: {
      return select.getStoredTodos();
    }
    case actions.SET_FILTER: {
      return select.setFilter(todos, action.filter);
    }
    case actions.UPDATE_TODOS: {
      return select.updateTodos(todos);
    }
    default:
      return todos;
  }
}
