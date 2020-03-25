import * as filter from "../constants/filter";

const LSKEY = "react-hooks-todos";

export const uuid = () => {
  return Date.now() + Math.floor(Math.random() * 50);
};

export const initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  payload: [],
  isUpdating: false,
  visibilityFilter: filter.ALL_TODOS,
  visible: []
};

export const getStoredTodos = () => {
  const store = localStorage.getItem(LSKEY);
  return (store && JSON.parse(store)) || initialTodos;
};

export const setStoredTodos = (payload: Todos) => {
  return localStorage.setItem(LSKEY, JSON.stringify(payload));
};

export const setVisibileTodos = (payload: Todo[], visibilityFilter: string) => {
  return visibilityFilter === filter.ALL_TODOS
    ? payload
    : payload.filter(todo =>
        visibilityFilter === filter.COMPLETED_TODOS
          ? todo.completed
          : !todo.completed
      );
};

export const updateTodos = (todos: Todos) => {
  const updatedData = {
    ...todos,
    isUpdating: false
  };
  setStoredTodos(updatedData);
  return updatedData;
};

export const deleteTodo = (todos: Todos, id: number) => {
  const updatedPayload = todos.payload.filter(todo => todo.id !== id);
  return {
    ...todos,
    countAll: todos.countAll - 1,
    countCompleted: updatedPayload.length,
    payload: updatedPayload.filter(todo => todo.id !== id),
    visible: setVisibileTodos(updatedPayload, todos.visibilityFilter),
    isUpdating: true
  };
};

export const deleteTodos = () => {
  setStoredTodos({
    ...initialTodos
  });
  return {
    ...initialTodos
  };
};

export const addTodo = (todos: Todos, title: string) => {
  const updatedPayload = [
    { id: uuid(), completed: false, title: title },
    ...todos.payload
  ];
  return {
    ...todos,
    countAll: todos.countAll + 1,
    payload: updatedPayload,
    visibilityFilter: filter.ALL_TODOS,
    isUpdating: true,
    visible: setVisibileTodos(updatedPayload, todos.visibilityFilter)
  };
};

export const editTodo = (todos: Todos, id: number) => {
  const updatedPayload = todos.payload.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  return {
    ...todos,
    countCompleted: updatedPayload.filter(todo => todo.completed).length,
    payload: updatedPayload,
    isUpdating: true,
    visible: setVisibileTodos(updatedPayload, todos.visibilityFilter)
  };
};

export const editTodos = (todos: Todos, isAllCompleted: boolean) => {
  const updatedPayload = todos.payload.map(todo =>
    todo.completed === !isAllCompleted
      ? { ...todo, completed: isAllCompleted }
      : todo
  );
  return {
    ...todos,
    countCompleted: updatedPayload.filter(todo => todo.completed).length,
    payload: updatedPayload,
    isUpdating: true,
    visible: setVisibileTodos(updatedPayload, todos.visibilityFilter)
  };
};

export const setFilter = (todos: Todos, filter: string) => {
  return {
    ...todos,
    visibilityFilter: filter,
    isUpdating: true,
    visible: setVisibileTodos(todos.payload, filter)
  };
};
