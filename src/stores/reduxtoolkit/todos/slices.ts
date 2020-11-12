import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as t from "../../../ts/types";
import { setTodosApi } from "../../../api";
import * as utils from "../../../utils";

//  Immer is used here
const todosSlice = createSlice({
  name: "todos",
  initialState: t.initialTodos,
  reducers: {
    add(state, { payload }: PayloadAction<{ title: string }>) {
      const { title } = payload;
      state.countAll = state.countAll + 1;
      state.isUpdating = true;
      state.data = [
        { id: utils.uuid(), completed: false, title: title },
        ...state.data,
      ];
      state.visibilityFilter = t.FILTER_ALL;
    },
    filter(state, { payload }: PayloadAction<{ filter: string }>) {
      const { filter } = payload;
      state.isUpdating = true;
      state.visibilityFilter = filter;
    },
    get(state, { payload }: PayloadAction<t.TodosT>) {
      const stateUpdated: t.TodosT = {
        ...payload,
        isUpdating: true,
      };
      setTodosApi(stateUpdated);
      return stateUpdated;
    },
    remove(state, { payload }: PayloadAction<t.TodoT>) {
      const { id } = payload;
      state.data = state.data.filter((_todo: t.TodoT) => _todo.id !== id);
      state.countAll = --state.countAll;
      state.countCompleted = state.data.filter(
        (_todo: t.TodoT) => _todo.completed
      ).length;
      state.isUpdating = true;
    },
    removeAll() {
      setTodosApi(t.initialTodos);
      return t.initialTodos;
    },

    search(state, { payload }: PayloadAction<{ searchTerm: string }>) {
      const { searchTerm } = payload;
      state.visibleTodos = state.data.filter((_todo: t.TodoT) =>
        _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.visibilityFilter = t.FILTER_ALL;
    },
    showSearch(state) {
      state.isSearching = !state.isSearching;
      state.isUpdating = true;
    },
    toggle(state, { payload }: PayloadAction<t.TodoT>) {
      const { id } = payload;
      state.data = state.data.map((_todo: t.TodoT) =>
        _todo.id === id ? { ..._todo, completed: !_todo.completed } : _todo
      );
      state.countCompleted = state.data.filter((todo) => todo.completed).length;
      state.isUpdating = true;
    },
    toggleAll(state, { payload }: PayloadAction<{ isAllCompleted: boolean }>) {
      const { isAllCompleted } = payload;
      state.data = state.data.map((_todo: t.TodoT) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
          : _todo
      );
      state.countCompleted = state.data.filter(
        (_todo: t.TodoT) => _todo.completed
      ).length;
      state.isUpdating = true;
    },

    update(state) {
      const stateUpdated: t.TodosT = {
        ...state,
        isUpdating: false,
        visibleTodos:
          state.visibilityFilter === t.FILTER_ALL
            ? state.data
            : state.data.filter((_todo: t.TodoT) =>
                state.visibilityFilter === t.FILTER_COMPLETED
                  ? _todo.completed
                  : !_todo.completed
              ),
      };
      setTodosApi(stateUpdated);
      return stateUpdated;
    },
  },
});

export const {
  add,
  filter,
  get,
  remove,
  removeAll,
  search,
  showSearch,
  toggle,
  toggleAll,
  update,
} = todosSlice.actions;

export default todosSlice.reducer;
