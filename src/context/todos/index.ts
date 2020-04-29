import * as actions from "../../constants/actions";
import * as filter from "../../constants/filter";
import * as utils from "../../utils";

const initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  editing: [],
  isSearching: false,
  isUpdating: false,
  payload: [],
  visibilityFilter: filter.ALL_TODOS,
  visible: [],
};

const reducer = (todos: Todos, action: ContextAction) => {
  switch (action.type) {
    case actions.ADD_TODO: {
      const statePayload = [
        { id: utils.uuid(), completed: false, title: action.title },
        ...todos.payload,
      ];
      return {
        ...todos,
        countAll: todos.countAll + 1,
        isUpdating: true,
        payload: statePayload,
        visibilityFilter: filter.ALL_TODOS,
      };
    }

    case actions.DELETE_TODO: {
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
    case actions.DELETE_TODOS: {
      utils.setStoredTodos({
        ...initialTodos,
      });
      return {
        ...initialTodos,
      };
    }

    case actions.EDIT_TODO: {
      const editingState = todos.editing.map((_todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, title: action.todo.title }
          : _todo
      );
      return {
        ...todos,
        editing: editingState,
      };
    }

    case actions.FILTER_TODOS: {
      return {
        ...todos,
        isUpdating: true,
        visibilityFilter: action.visibiltityFilter,
      };
    }

    case actions.GET_TODOS: {
      return utils.getStoredTodos();
    }

    case actions.SAVE_TODO: {
      const stateTodo = todos.editing[0];
      const statePayload: Todo[] = [
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

    case actions.SEARCH_TODOS: {
      const stateVisible = todos.payload.filter((_todo) =>
        _todo.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return {
        ...todos,
        visible: stateVisible,
        visibilityFilter: filter.ALL_TODOS,
      };
    }

    case actions.SHOW_EDIT: {
      const allreadyIncluded: boolean = todos.editing.includes(action.todo);
      return {
        ...todos,
        editing: allreadyIncluded ? [] : [action.todo],
        isUpdating: true,
      };
    }

    case actions.SHOW_SEARCH: {
      return {
        ...todos,
        isSearching: !todos.isSearching,
        isUpdating: true,
      };
    }

    case actions.TOGGLE_TODO: {
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

    case actions.TOGGLE_TODOS: {
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

    case actions.UPDATE_TODOS: {
      const stateUpdated: Todos = {
        ...todos,
        isUpdating: false,
        visible:
          todos.visibilityFilter === filter.ALL_TODOS
            ? todos.payload
            : todos.payload.filter((_todo) =>
                todos.visibilityFilter === filter.COMPLETED_TODOS
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
