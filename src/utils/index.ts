import * as types from "../ts/types";

export const uuid = () => {
  return Date.now() + Math.floor(Math.random() * 50);
};

export const getStoredTodos = () => {
  const store = localStorage.getItem(types.LSKEY);
  return (store && JSON.parse(store)) || types.initialTodos;
};

export const setStoredTodos = (payload: types.Todos) => {
  return localStorage.setItem(types.LSKEY, JSON.stringify(payload));
};
