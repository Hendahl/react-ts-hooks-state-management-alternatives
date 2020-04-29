/*
 * Note ! To keep basic functions togheter for this demo, we are using this utils.
 * For more less complex and recommended way - >
 * take a look in every specifik branch basic, redux, context, mobx
 */

import * as filter from "../constants/filter";

const LSKEY = "react-hooks-todos-all";

export const uuid = () => {
  return Date.now() + Math.floor(Math.random() * 50);
};

export const initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  editing: [],
  isSearching: false,
  isUpdating: false,
  payload: [],
  visibilityFilter: filter.ALL_TODOS,
  visible: [],
};

export const getStoredTodos = () => {
  const store = localStorage.getItem(LSKEY);
  return (store && JSON.parse(store)) || initialTodos;
};

export const setStoredTodos = (payload: Todos) => {
  return localStorage.setItem(LSKEY, JSON.stringify(payload));
};

export const updateTodos = (todos: Todos) => {
  const payloadState: Todo[] = [...todos.payload];
  const todosState: Todos = {
    ...todos,
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
  setStoredTodos(todosState);
  return todosState;
};

export const deleteTodo = (todos: Todos, id: number) => {
  const payloadState = todos.payload.filter((_todo) => _todo.id !== id);
  return {
    ...todos,
    countAll: --todos.countAll,
    countCompleted: payloadState.length,
    payload: payloadState.filter((_todo) => _todo.id !== id),
    isUpdating: true,
  };
};

export const deleteTodos = () => {
  setStoredTodos({
    ...initialTodos,
  });
  return {
    ...initialTodos,
  };
};

export const addTodo = (todos: Todos, title: string) => {
  const payloadState = [
    { id: uuid(), completed: false, title: title },
    ...todos.payload,
  ];
  return {
    ...todos,
    countAll: todos.countAll + 1,
    payload: payloadState,
    visibilityFilter: filter.ALL_TODOS,
    isUpdating: true,
  };
};

export const changeTodoTitle = (todos: Todos, todo: Todo) => {
  const editingState = todos.editing.map((_todo) =>
    _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
  );
  return {
    ...todos,
    editing: editingState,
  };
};

export const changeTodosCompleted = (todos: Todos, isAllCompleted: boolean) => {
  const payloadState = todos.payload.map((_todo) =>
    _todo.completed === !isAllCompleted
      ? { ..._todo, completed: isAllCompleted }
      : _todo
  );
  return {
    ...todos,
    countCompleted: payloadState.filter((_todo) => _todo.completed).length,
    payload: payloadState,
    isUpdating: true,
  };
};

export const changeTodoCompleted = (todos: Todos, todo: Todo) => {
  const payloadState = todos.payload.map((_todo) =>
    _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
  );
  return {
    ...todos,
    countCompleted: payloadState.filter((_todo) => _todo.completed).length,
    payload: payloadState,
    isUpdating: true,
  };
};

/* Since we only handle edit of one Todo at the time we toogle the existence, if you need a multi editing -> you should
    rewrite this... */
export const editingTodo = (todos: Todos, todo: Todo) => {
  const isAllreadyIncluded: boolean = todos.editing.includes(todo);
  return {
    ...todos,
    editing: isAllreadyIncluded ? [] : [todo],
    isUpdating: true,
  };
};

export const saveTodoTitle = (todos: Todos) => {
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
};

export const setFilter = (todos: Todos, visibilityFilter: string) => {
  return {
    ...todos,
    visibilityFilter: visibilityFilter,
    isUpdating: true,
  };
};

export const searchToggle = (todos: Todos) => {
  return {
    ...todos,
    isSearching: !todos.isSearching,
    isUpdating: true,
  };
};

export const searchTodos = (todos: Todos, searchTerm: string) => {
  const visibleState = todos.payload.filter((_todo) =>
    _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return {
    ...todos,
    visibilityFilter: filter.ALL_TODOS,
    visible: visibleState,
  };
};
