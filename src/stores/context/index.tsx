import * as t from "../../ts/types";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import reducer from "./todos";
import { getTodosApi } from "../../api";

type ContextType = {
  todos: t.TodosT;
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
