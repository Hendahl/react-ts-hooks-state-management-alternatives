import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import * as utils from "../utils";
import reducer from "./todos";

type ContextType = {
  todos: Todos;
  dispatch: Dispatch<Action>;
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
