import { createContext, useContext } from "react";
import { Instance, onSnapshot, types } from "mobx-state-tree";
import { Todos } from "./todos";
import { getTodosApi } from "../../api";

const RootModel = types.model({
  todos: Todos,
});

export const store = RootModel.create({ todos: getTodosApi() });

onSnapshot(store, (snapshot) => {
  store.todos.updateTodos();
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
