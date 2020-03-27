import * as utils from "../utils";
import { createContext, useContext } from "react";
import { Instance, onSnapshot, types } from "mobx-state-tree";
import { Todos } from "./todos";

const RootModel = types.model({
  todos: Todos
});

export const store = RootModel.create({ todos: utils.getStoredTodos() });

onSnapshot(store, snapshot => {
  utils.setStoredTodos(snapshot.todos);
  //console.log(snapshot.todos);
});

export type RootInstance = Instance<typeof RootModel>;
const storeContext = createContext<null | RootInstance>(null);

export const Provider = storeContext.Provider;
export const useStore = () => {
  const store = useContext(storeContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
};
