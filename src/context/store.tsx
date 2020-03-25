import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import * as select from "../selectors";
import reducer from "./todos";

type ContextType = {
  todos: Todos;
  dispatch: Dispatch<Action>;
};

export const Context = createContext<ContextType>(select.getStoredTodos());

export const Provider = (props: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(reducer, select.getStoredTodos());
  return (
    <Context.Provider value={{ todos, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
