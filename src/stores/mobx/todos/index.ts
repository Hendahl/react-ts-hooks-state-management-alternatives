import * as t from "../../../ts/types";
import * as utils from "../../../utils";
import { getTodosApi, setTodosApi } from "../../../api";
import {
  applySnapshot,
  destroy,
  getRoot,
  getSnapshot,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";

export const TodoT = types
  .model({
    id: types.identifierNumber,
    isCompleted: types.boolean,
    title: types.string,
  })
  .actions((self) => ({
    toggle() {
      getRoot<TodosModel>(self).toggle(self);
    },
    remove() {
      getRoot<TodosModel>(self).remove(self);
    },
    edit() {
      getRoot<TodosModel>(self).edit(self);
    },
  }));

export const TodosT = types
  .model({
    data: types.optional(types.array(TodoT), []),
    dataFilter: types.string,
    dataFiltered: types.optional(types.array(TodoT), []),
    isPayloadVisible: types.boolean,
    isSearchVisible: types.boolean,
    isUpdating: types.boolean,
  })
  .views((self) => ({
    get countCompletedView() {
      return self.data.filter((_todo) => _todo.isCompleted).length;
    },
    get countAllView() {
      return self.data.length;
    },
    get dataFilteredView() {
      return self.dataFilter === t.FILTER_ALL
        ? self.data
        : self.data.filter((_todo) =>
            self.dataFilter === t.FILTER_COMPLETED
              ? _todo.isCompleted
              : !_todo.isCompleted
          );
    },
  }))
  .actions((self) => ({
    add(title: string) {
      const id = utils.uuid();
      const newTodo = {
        id,
        title,
        isCompleted: false,
      };
      self.isUpdating = true;
      self.data.unshift(newTodo);
      self.dataFilter = t.FILTER_ALL;
    },
    edit(todo: SnapshotIn<TodoModel>) {},
    remove(todo: SnapshotIn<TodoModel>) {
      self.data.replace(self.data.filter((_todo) => _todo.id !== todo.id));
      self.isUpdating = true;
      destroy(todo);
    },
    removeAll() {
      setTodosApi({
        ...t.initialTodos,
      });
      applySnapshot(self, t.initialTodos);
    },
    filter(visibiltityFilter: string) {
      self.dataFilter = visibiltityFilter;
      self.isUpdating = true;
    },
    get() {
      applySnapshot(self, getTodosApi());
    },
    toggle(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const statePayload = self.data.map((_todo) =>
        _todo.id === todo.id
          ? { ..._todo, isCompleted: !_todo.isCompleted }
          : _todo
      );
      self.data.replace(statePayload);
      self.isUpdating = true;
    },
    toggleAll(isAllCompleted: boolean) {
      const statePayload = self.data.map((_todo) =>
        _todo.isCompleted === !isAllCompleted
          ? { ..._todo, isCompleted: isAllCompleted }
          : _todo
      );
      self.data.replace(statePayload);
      self.isUpdating = true;
    },

    updateAll() {
      if (self.isUpdating) {
        self.isUpdating = false;
        const stateUpdated = {
          countAll: self.countAllView,
          countCompleted: self.countCompletedView,
          data: getSnapshot(self).data,
          dataFilter: self.dataFilter,
          isPayloadVisible: self.isPayloadVisible,
          isSearchVisible: self.isSearchVisible,
          isUpdating: false,
          dataFiltered:
            self.dataFilter === t.FILTER_ALL
              ? self.data
              : self.data.filter((_todo: t.TodoT) =>
                  self.dataFilter === t.FILTER_COMPLETED
                    ? _todo.isCompleted
                    : !_todo.isCompleted
                ),
        };
        setTodosApi(stateUpdated);
      }
    },
  }));
