import * as actions from "../../constants/actions";
import * as filter from "../../constants/filter";
import * as utils from "../../utils";

const reducer = (todos: Todos, action: Action) => {
  switch (action.type) {
    case actions.ADD_TODO: {
      return {
        ...todos,
        countAll: todos.countAll + 1,
        payload: [
          { id: utils.uuid(), completed: false, title: action.title },
          ...todos.payload,
        ],
        isUpdating: true,
        visibilityFilter: filter.ALL_TODOS,
      };
    }
    case actions.DELETE_TODO: {
      return {
        ...todos,
        countAll: todos.countAll - 1,
        payload: todos.payload.filter((_todo) => _todo.id !== action.id),
        isUpdating: true,
      };
    }
    case actions.DELETE_TODOS: {
      const defaultValues = utils.initialTodos;
      utils.setStoredTodos({
        ...defaultValues,
      });
      return {
        ...defaultValues,
      };
    }
    case actions.EDITING_TODO: {
      const allreadyIncluded: boolean = todos.editing.includes(action.todo);
      return {
        ...todos,
        editing: allreadyIncluded ? [] : [action.todo],
        isUpdating: true,
      };
    }

    case actions.CHANGE_TODO_COMPLETED: {
      const payloadState = todos.payload.map((_todo) =>
        _todo.id === action.todo.id
          ? { ..._todo, completed: !_todo.completed }
          : _todo
      );
      return {
        ...todos,
        payload: payloadState,
        isUpdating: true,
      };
    }
    case actions.CHANGE_TODO_TITLE: {
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
    case actions.CHANGE_TODOS_COMPLETED: {
      const payloadState: Todo[] = [
        ...todos.payload.map((todo) =>
          todo.completed === !action.isAllCompleted
            ? { ...todo, completed: action.isAllCompleted }
            : todo
        ),
      ];
      return {
        ...todos,
        payload: payloadState,
        isUpdating: true,
      };
    }
    case actions.GET_TODOS: {
      return utils.getStoredTodos();
    }
    case actions.SET_FILTER: {
      return {
        ...todos,
        visibilityFilter: action.visibiltityFilter,
        isUpdating: true,
      };
    }
    case actions.UPDATE_TODOS: {
      const payloadState: Todo[] = [...todos.payload];
      const todosState: Todos = {
        ...todos,
        countCompleted: payloadState.filter((_todo) => _todo.completed).length,
        isUpdating: false,
        visible:
          todos.visibilityFilter === filter.ALL_TODOS
            ? payloadState
            : payloadState.filter((_todo) =>
                todos.visibilityFilter === filter.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              ),
      };
      utils.setStoredTodos(todosState);
      return todosState;
    }

    case actions.SAVE_TODO: {
      const editingTodo = todos.editing[0];
      const payloadState: Todo[] = [
        ...todos.payload.map((_todo) =>
          _todo.id === editingTodo.id
            ? { ..._todo, title: editingTodo.title }
            : _todo
        ),
      ];
      return {
        ...todos,
        payload: payloadState,
        editing: [],
        isUpdating: true,
      };
    }

    default:
      return todos;
  }
};
export default reducer;
