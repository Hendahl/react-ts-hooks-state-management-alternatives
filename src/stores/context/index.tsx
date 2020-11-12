import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import reducer from "./todos";
import * as t from "../../ts/types";
import { getTodosApi } from "../../api";

type ContextType = {
  todos: t.Todos;
  dispatch: Dispatch<t.ActionTypes>;
};

export const Context = createContext<ContextType>(getTodosApi());

export const Provider = (props: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(reducer, getTodosApi());
  return (
    <Context.Provider value={{ todos, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
