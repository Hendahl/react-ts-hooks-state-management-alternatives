import * as types from "../../ts/types";
import * as utils from "../../utils";

const reducer = (todos: types.Todos, action: ContextAction) => {
  switch (action.type) {
    case types.ADD_TODO: {
      const statePayload = [
        { id: utils.uuid(), completed: false, title: action.title },
        ...todos.payload,
      ];
      return {
        ...todos,
        countAll: todos.countAll + 1,
        isUpdating: true,
        payload: statePayload,
        visibilityFilter: types.ALL_TODOS,
      };
    }

    case types.DELETE_TODO: {
      const statePayload = todos.payload.filter(
        (_todo) => _todo.id !== action.id
      );
      return {
        ...todos,
        countAll: --todos.countAll,
        countCompleted: statePayload.length,
        isUpdating: true,
        payload: statePayload.filter((_todo) => _todo.id !== action.id),
      };
    }
    case types.DELETE_TODOS: {
      utils.setStoredTodos({
        ...types.initialTodos,
      });
      return {
        ...types.initialTodos,
      };
    }

    case types.EDIT_TODO: {
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

    case types.FILTER_TODOS: {
      return {
        ...todos,
        isUpdating: true,
        visibilityFilter: action.visibiltityFilter,
      };
    }

    case types.GET_TODOS: {
      return utils.getStoredTodos();
    }

    case types.SAVE_TODO: {
      const stateTodo = todos.editing[0];
      const statePayload: types.Todo[] = [
        ...todos.payload.map((_todo) =>
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

    case types.SEARCH_TODOS: {
      const stateVisible = todos.payload.filter((_todo) =>
        _todo.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return {
        ...todos,
        visible: stateVisible,
        visibilityFilter: types.ALL_TODOS,
      };
    }

    case types.SHOW_EDIT: {
      const allreadyIncluded: boolean = todos.editing.includes(action.todo);
      return {
        ...todos,
        editing: allreadyIncluded ? [] : [action.todo],
        isUpdating: true,
      };
    }

    case types.SHOW_SEARCH: {
      return {
        ...todos,
        isSearching: !todos.isSearching,
        isUpdating: true,
      };
    }

    case types.TOGGLE_TODO: {
      const statePayload = todos.payload.map((_todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, completed: !_todo.completed }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo) => _todo.completed).length,
        isUpdating: true,
        payload: statePayload,
      };
    }

    case types.TOGGLE_TODOS: {
      const statePayload = todos.payload.map((_todo) =>
        _todo.completed === !action.isAllCompleted
          ? { ..._todo, completed: action.isAllCompleted }
          : _todo
      );
      return {
        ...todos,
        countCompleted: statePayload.filter((_todo) => _todo.completed).length,
        isUpdating: true,
        payload: statePayload,
      };
    }

    case types.UPDATE_TODOS: {
      const stateUpdated: types.Todos = {
        ...todos,
        isUpdating: false,
        visible:
          todos.visibilityFilter === types.ALL_TODOS
            ? todos.payload
            : todos.payload.filter((_todo) =>
                todos.visibilityFilter === types.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              ),
      };
      utils.setStoredTodos(stateUpdated);
      return stateUpdated;
    }

    default:
      return todos;
  }
};
export default reducer;
