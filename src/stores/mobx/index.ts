import { createContext, useContext } from "react";
import { getTodosApi } from "../../api";
import { Instance, onSnapshot, types } from "mobx-state-tree";
import { TodosT } from "./todos";

const RootModel = types.model({
  todos: TodosT,
});

export const store = RootModel.create({ todos: getTodosApi() });

onSnapshot(store, (snapshot) => {
  store.todos.updateAll();
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
