import * as t from "../../../ts/types";
import * as utils from "../../../utils";
import { setTodosApi } from "../../../api";

const reducer = (todos: t.TodosT, action: t.ActionTypes) => {
  switch (action.type) {
    case t.ADD: {
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

    case t.REMOVE: {
      const statePayload = todos.data.filter((_todo) => _todo.id !== action.id);
      return {
        ...todos,
        countAll: --todos.countAll,
        countCompleted: statePayload.length,
        isUpdating: true,
        data: statePayload.filter((_todo) => _todo.id !== action.id),
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

    case t.EDIT: {
      const stateEditing = todos.editing.map((_todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, title: action.todo.title }
          : _todo
      );
      return {
        ...todos,
        editing: stateEditing,
      };
    }

    case t.FILTER: {
      return {
        ...todos,
        isUpdating: true,
        visibilityFilter: action.visibiltityFilter,
      };
    }

    case t.SAVE: {
      const stateTodo = todos.editing[0];
      const statePayload: t.TodoT[] = [
        ...todos.data.map((_todo) =>
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

    case t.SEARCH: {
      const stateVisible = todos.data.filter((_todo) =>
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

    case t.TOGGLE: {
      const statePayload = todos.data.map((_todo: t.TodoT) =>
        _todo.id === action.todo.id
          ? { ..._todo, completed: !_todo.completed }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo) => _todo.completed).length,
        isUpdating: true,
        data: statePayload,
      };
    }

    case t.TOGGLE_ALL: {
      const statePayload = todos.data.map((_todo) =>
        _todo.completed === !action.isAllCompleted
          ? { ..._todo, completed: action.isAllCompleted }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo) => _todo.completed).length,
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
            : todos.data.filter((_todo) =>
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
};
export default reducer;
