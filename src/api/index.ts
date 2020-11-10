import * as t from "../ts/types";

export const getTodosApi = () => {
  const store = localStorage.getItem(t.LSKEY);
  return (store && JSON.parse(store)) || t.initialTodos;
};

export const setTodosApi = (payload: t.Todos) => {
  return localStorage.setItem(t.LSKEY, JSON.stringify(payload));
};
