import * as t from "../../../ts/types";
import * as utils from "../../../utils";
import { getTodosApi, setTodosApi } from "../../../api";
export default function reducer(
  todos = t.initialTodos,
  action: t.ActionTypes
): t.TodosT {
  switch (action.type) {
    case t.ADD: {
      const statePayload = [
        { id: utils.uuid(), isCompleted: false, title: action.title },
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
    case t.REMOVE: {
      const statePayload = todos.data.filter(
        (_todo: t.TodoT) => _todo.id !== action.id
      );
      return {
        ...todos,
        countAll: --todos.countAll,
        countCompleted: statePayload.filter(
          (_todo: t.TodoT) => _todo.isCompleted
        ).length,
        isUpdating: true,
        data: statePayload.filter((_todo: t.TodoT) => _todo.id !== action.id),
      };
    }
    case t.REMOVE_ALL: {
      setTodosApi({
        ...t.initialTodos,
      });
      return {
        ...t.initialTodos,
      };
    }
    case t.FILTER: {
      return {
        ...todos,
        isUpdating: true,
        visibilityFilter: action.visibiltityFilter,
      };
    }
    case t.GET: {
      return getTodosApi();
    }

    case t.SEARCH: {
      const stateVisible = todos.data.filter((_todo: t.TodoT) =>
        _todo.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return {
        ...todos,
        visibleTodos: stateVisible,
        visibilityFilter: t.FILTER_ALL,
      };
    }
    case t.SHOW_SEARCH: {
      return {
        ...todos,
        isSearching: !todos.isSearching,
        isUpdating: true,
      };
    }
    case t.TOGGLE: {
      const statePayload = todos.data.map((_todo: t.TodoT) =>
        _todo.id === action.todo.id
          ? { ..._todo, isCompleted: !_todo.isCompleted }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter(
          (_todo: t.TodoT) => _todo.isCompleted
        ).length,
        isUpdating: true,
        data: statePayload,
      };
    }
    case t.TOGGLE_ALL: {
      const statePayload = todos.data.map((_todo: t.TodoT) =>
        _todo.isCompleted === !action.isAllCompleted
          ? { ..._todo, isCompleted: action.isAllCompleted }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter(
          (_todo: t.TodoT) => _todo.isCompleted
        ).length,
        isUpdating: true,
        data: statePayload,
      };
    }

    case t.UPDATE: {
      const stateUpdated: t.TodosT = {
        ...todos,
        isUpdating: false,
        visibleTodos:
          todos.visibilityFilter === t.FILTER_ALL
            ? todos.data
            : todos.data.filter((_todo: t.TodoT) =>
                todos.visibilityFilter === t.FILTER_COMPLETED
                  ? _todo.isCompleted
                  : !_todo.isCompleted
              ),
      };
      setTodosApi(stateUpdated);
      return stateUpdated;
    }
    default:
      return todos;
  }
}
