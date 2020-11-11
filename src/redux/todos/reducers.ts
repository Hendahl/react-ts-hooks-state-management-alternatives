import * as t from "../../ts/types";
import * as utils from "../../utils";
import { getTodosApi, setTodosApi } from "../../api";
export default function reducer(
  todos = t.initialTodos,
  action: t.ActionTypes
): t.Todos {
  switch (action.type) {
    case t.TODO_ADD: {
      const statePayload = [
        { id: utils.uuid(), completed: false, title: action.title },
        ...todos.data,
      ];
      return {
        ...todos,
        countAll: todos.countAll + 1,
        isUpdating: true,
        data: statePayload,
        visibilityFilter: t.FILTER_ALL,
      };
    }
    case t.TODO_DELETE: {
      const statePayload = todos.data.filter(
        (_todo: t.Todo) => _todo.id !== action.id
      );
      return {
        ...todos,
        countAll: --todos.countAll,
        countCompleted: statePayload.length,
        isUpdating: true,
        data: statePayload.filter((_todo: t.Todo) => _todo.id !== action.id),
      };
    }
    case t.TODOS_DELETE: {
      setTodosApi({
        ...t.initialTodos,
      });
      return {
        ...t.initialTodos,
      };
    }
    case t.TODO_EDIT: {
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
    case t.TODOS_FILTER: {
      return {
        ...todos,
        isUpdating: true,
        visibilityFilter: action.visibiltityFilter,
      };
    }
    case t.TODOS_GET: {
      return getTodosApi();
    }
    case t.TODO_SAVE: {
      const stateTodo = todos.editing[0];
      const statePayload: t.Todo[] = [
        ...todos.data.map((_todo: t.Todo) =>
          _todo.id === stateTodo.id
            ? { ..._todo, title: stateTodo.title }
            : _todo
        ),
      ];
      return {
        ...todos,
        data: statePayload,
        editing: [],
        isUpdating: true,
      };
    }
    case t.TODOS_SEARCH: {
      const stateVisible = todos.data.filter((_todo: t.Todo) =>
        _todo.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return {
        ...todos,
        visibleTodos: stateVisible,
        visibilityFilter: t.FILTER_ALL,
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
    case t.TODO_TOGGLE: {
      const statePayload = todos.data.map((_todo: t.Todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, completed: !_todo.completed }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo: t.Todo) => _todo.completed)
          .length,
        isUpdating: true,
        data: statePayload,
      };
    }
    case t.TODOS_TOGGLE: {
      const statePayload = todos.data.map((_todo: t.Todo) =>
        _todo.completed === !action.isAllCompleted
          ? { ..._todo, completed: action.isAllCompleted }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo: t.Todo) => _todo.completed)
          .length,
        isUpdating: true,
        data: statePayload,
      };
    }

    case t.TODOS_UPDATE: {
      const stateUpdated: t.Todos = {
        ...todos,
        isUpdating: false,
        visibleTodos:
          todos.visibilityFilter === t.FILTER_ALL
            ? todos.data
            : todos.data.filter((_todo: t.Todo) =>
                todos.visibilityFilter === t.FILTER_COMPLETED
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
