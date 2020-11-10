import * as t from "../../ts/types";
import * as utils from "../../utils";
import { getTodosApi, setTodosApi } from "../../api";
export default function reducer(
  todos = t.initialTodos,
  action: t.ActionTypes
): t.Todos {
  switch (action.type) {
    case t.ADD_TODO: {
      const statePayload = [
        { id: utils.uuid(), completed: false, title: action.title },
        ...todos.payload,
      ];
      return {
        ...todos,
        countAll: todos.countAll + 1,
        isUpdating: true,
        payload: statePayload,
        visibilityFilter: t.ALL_TODOS,
      };
    }
    case t.DELETE_TODO: {
      const statePayload = todos.payload.filter(
        (_todo: t.Todo) => _todo.id !== action.id
      );
      return {
        ...todos,
        countAll: --todos.countAll,
        countCompleted: statePayload.length,
        isUpdating: true,
        payload: statePayload.filter((_todo: t.Todo) => _todo.id !== action.id),
      };
    }
    case t.DELETE_TODOS: {
      setTodosApi({
        ...t.initialTodos,
      });
      return {
        ...t.initialTodos,
      };
    }
    case t.EDIT_TODO: {
      const stateEditing = todos.editing.map((_todo: t.Todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, title: action.todo.title }
          : _todo
      );
      return {
        ...todos,
        editing: stateEditing,
      };
    }
    case t.FILTER_TODOS: {
      return {
        ...todos,
        isUpdating: true,
        visibilityFilter: action.visibiltityFilter,
      };
    }
    case t.GET_TODOS: {
      return getTodosApi();
    }
    case t.SAVE_TODO: {
      const stateTodo = todos.editing[0];
      const statePayload: t.Todo[] = [
        ...todos.payload.map((_todo: t.Todo) =>
          _todo.id === stateTodo.id
            ? { ..._todo, title: stateTodo.title }
            : _todo
        ),
      ];
      return {
        ...todos,
        payload: statePayload,
        editing: [],
        isUpdating: true,
      };
    }
    case t.SEARCH_TODOS: {
      const stateVisible = todos.payload.filter((_todo: t.Todo) =>
        _todo.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return {
        ...todos,
        visible: stateVisible,
        visibilityFilter: t.ALL_TODOS,
      };
    }
    case t.SHOW_EDIT: {
      const allreadyIncluded: boolean = todos.editing.includes(action.todo);
      return {
        ...todos,
        editing: allreadyIncluded ? [] : [action.todo],
        isUpdating: true,
      };
    }
    case t.SHOW_SEARCH: {
      return {
        ...todos,
        isSearching: !todos.isSearching,
        isUpdating: true,
      };
    }
    case t.TOGGLE_TODO: {
      const statePayload = todos.payload.map((_todo: t.Todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, completed: !_todo.completed }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo: t.Todo) => _todo.completed)
          .length,
        isUpdating: true,
        payload: statePayload,
      };
    }
    case t.TOGGLE_TODOS: {
      const statePayload = todos.payload.map((_todo: t.Todo) =>
        _todo.completed === !action.isAllCompleted
          ? { ..._todo, completed: action.isAllCompleted }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo: t.Todo) => _todo.completed)
          .length,
        isUpdating: true,
        payload: statePayload,
      };
    }

    case t.UPDATE_TODOS: {
      const stateUpdated: t.Todos = {
        ...todos,
        isUpdating: false,
        visible:
          todos.visibilityFilter === t.ALL_TODOS
            ? todos.payload
            : todos.payload.filter((_todo: t.Todo) =>
                todos.visibilityFilter === t.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              ),
      };
      setTodosApi(stateUpdated);
      return stateUpdated;
    }
    default:
      return todos;
  }
}
