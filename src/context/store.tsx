import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import * as utils from "../utils";
import reducer from "./todos";
import * as types from "../ts/types";

type ContextType = {
  todos: types.Todos;
  dispatch: Dispatch<ContextAction>;
};

export const Context = createContext<ContextType>(utils.getStoredTodos());

export const Provider = (props: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(reducer, utils.getStoredTodos());
  return (
    <Context.Provider value={{ todos, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
