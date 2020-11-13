import * as t from "../../../ts/types";
import * as utils from "../../../utils";
import { getVisibleApi, getTodosApi, setTodosApi } from "../../../api";
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
        dataFilter: t.FILTER_ALL,
      };
    }
    case t.FILTER: {
      return {
        ...todos,
        isUpdating: true,
        dataFilter: action.visibiltityFilter,
      };
    }
    case t.GET: {
      return getTodosApi();
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
    case t.SEARCH: {
      const stateVisible = todos.data.filter((_todo: t.TodoT) =>
        _todo.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return {
        ...todos,
        filteredData: stateVisible,
        dataFilter: t.FILTER_ALL,
      };
    }

    case t.VISIBILITY_PAYLOAD: {
      return {
        ...todos,
        isPayloadVisible: !todos.isPayloadVisible,
        isUpdating: true,
      };
    }

    case t.VISIBILITY_SEARCH: {
      return {
        ...todos,
        isSearchVisible: !todos.isSearchVisible,
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
      return getVisibleApi(todos);
    }
    default:
      return todos;
  }
}
