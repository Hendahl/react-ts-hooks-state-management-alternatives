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
    edit(state, { payload }: PayloadAction<t.Todo>) {},
    filter(state, { payload }: PayloadAction<{ filter: string }>) {
      const { filter } = payload;
      state.isUpdating = true;
      state.visibilityFilter = filter;
    },
    get(state, { payload }: PayloadAction<t.Todos>) {
      const {
        countAll,
        countCompleted,
        data,
        editing,
        isSearching,
        visibilityFilter,
        visibleTodos,
      } = payload;
      state.countAll = countAll;
      state.countCompleted = countCompleted;
      state.data = data;
      state.editing = editing;
      state.isSearching = isSearching;
      state.isUpdating = true;
      state.visibilityFilter = visibilityFilter;
      state.visibleTodos = visibleTodos;
    },
    remove(state, { payload }: PayloadAction<t.Todo>) {
      const { id } = payload;
      const statePayload = state.data.filter(
        (_todo: t.Todo) => _todo.id !== id
      );
      state.countAll = --state.countAll;
      state.countCompleted = statePayload.length;
      state.isUpdating = true;
      state.data = statePayload.filter((_todo: t.Todo) => _todo.id !== id);
    },
    removeAll() {
      setTodosApi(t.initialTodos);
      return t.initialTodos;
    },
    toggle(state, { payload }: PayloadAction<t.Todo>) {
      const { id } = payload;
      const statePayload = state.data.map((_todo: t.Todo) =>
        _todo.id === id ? { ..._todo, completed: !_todo.completed } : _todo
      );
      state.countCompleted = statePayload.filter(
        (_todo: t.Todo) => _todo.completed
      ).length;
      state.isUpdating = true;
      state.data = statePayload;
    },
    save() {},
    search(state, { payload }: PayloadAction<{ searchTerm: string }>) {
      const { searchTerm } = payload;
      const statePayload = state.data.filter((_todo: t.Todo) =>
        _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.visibleTodos = statePayload;
      state.visibilityFilter = t.FILTER_ALL;
    },
    showEdit(state, { payload }: PayloadAction<t.Todo>) {
      const allreadyIncluded: boolean = state.editing.includes(payload);
      console.log(allreadyIncluded);
      state.editing = allreadyIncluded ? [] : [payload];
      state.isUpdating = true;
    },
    showSearch(state) {
      state.isSearching = !state.isSearching;
      state.isUpdating = true;
    },
    toggleAll(state, { payload }: PayloadAction<{ isAllCompleted: boolean }>) {
      const { isAllCompleted } = payload;
      const statePayload = state.data.map((_todo: t.Todo) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
          : _todo
      );
      state.countCompleted = statePayload.filter(
        (_todo: t.Todo) => _todo.completed
      ).length;
      state.isUpdating = true;
      state.data = statePayload;
    },

    update(state) {
      const stateUpdated: t.Todos = {
        ...state,
        isUpdating: false,
        visibleTodos:
          state.visibilityFilter === t.FILTER_ALL
            ? state.data
            : state.data.filter((_todo: t.Todo) =>
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
  edit,
  filter,
  get,
  remove,
  removeAll,
  save,
  search,
  showEdit,
  showSearch,
  toggle,
  toggleAll,
  update,
} = todosSlice.actions;

export default todosSlice.reducer;
