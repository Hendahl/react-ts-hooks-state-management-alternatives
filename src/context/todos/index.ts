import * as actions from "../../constants/actions";
import * as filter from "../../constants/filter";
import * as utils from "../../utils";

const reducer = (todos: Todos, action: Action) => {
  switch (action.type) {
    case actions.ADD_TODO: {
      return {
        ...todos,
        countAll: ++todos.countAll,
        payload: [
          { id: utils.uuid(), completed: false, title: action.title },
          ...todos.payload
        ],
        isUpdating: true,
        visibilityFilter: filter.ALL_TODOS
      };
    }
    case actions.DELETE_TODO: {
      return {
        ...todos,
        countAll: --todos.countAll,
        payload: todos.payload.filter(_todo => _todo.id !== action.id),
        isUpdating: true
      };
    }
    case actions.DELETE_TODOS: {
      const defaultValues = utils.initialTodos;
      utils.setStoredTodos({
        ...defaultValues
      });
      return {
        ...defaultValues
      };
    }
    case actions.EDIT_TODO: {
      const payloadState: Todo[] = [...todos.payload];
      return {
        ...todos,
        payload: payloadState.map(_todo =>
          _todo.id === action.id
            ? { ..._todo, completed: !_todo.completed }
            : _todo
        ),
        isUpdating: true
      };
    }
    case actions.EDIT_TODOS: {
      const payloadState: Todo[] = [
        ...todos.payload.map(todo =>
          todo.completed === !action.isAllCompleted
            ? { ...todo, completed: action.isAllCompleted }
            : todo
        )
      ];
      return {
        ...todos,
        payload: payloadState,
        isUpdating: true
      };
    }
    case actions.GET_TODOS: {
      return utils.getStoredTodos();
    }
    case actions.SET_FILTER: {
      return {
        ...todos,
        visibilityFilter: action.visibilityFilter,
        isUpdating: true
      };
    }
    case actions.UPDATE_TODOS: {
      const payloadState: Todo[] = [...todos.payload];
      utils.setStoredTodos(todos);
      return {
        ...todos,
        countCompleted: payloadState.filter(_todo => _todo.completed).length,
        isUpdating: false,
        visible:
          todos.visibilityFilter === filter.ALL_TODOS
            ? payloadState
            : payloadState.filter(_todo =>
                todos.visibilityFilter === filter.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              )
      };
    }
    default:
      return todos;
  }
};
export default reducer;
