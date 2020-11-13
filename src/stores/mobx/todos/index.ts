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
    isCompleted: types.boolean,
    id: types.identifierNumber,
    title: types.string,
  })
  .actions((self) => ({
    toggle() {
      getRoot<TodosModel>(self).toggle(self);
    },
    remove() {
      getRoot<TodosModel>(self).remove(self);
    },
    showEdit() {
      getRoot<TodosModel>(self).showEdit(self);
    },
  }));

export const TodosT = types
  .model({
    data: types.optional(types.array(TodoT), []),
    isShowPayload: types.boolean,
    isShowSearch: types.boolean,
    isUpdating: types.boolean,
    visibilityFilter: types.string,
    visibleTodos: types.optional(types.array(TodoT), []),
  })
  .views((self) => ({
    get countCompletedView() {
      return self.data.filter((_todo) => _todo.isCompleted).length;
    },
    get countAllView() {
      return self.data.length;
    },
    get visibleTodosView() {
      return self.visibilityFilter === t.FILTER_ALL
        ? self.data
        : self.data.filter((_todo) =>
            self.visibilityFilter === t.FILTER_COMPLETED
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
      self.visibilityFilter = t.FILTER_ALL;
    },
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
      self.visibilityFilter = visibiltityFilter;
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
          visibilityFilter: self.visibilityFilter,
          isShowPayload: self.isShowPayload,
          isShowSearch: self.isShowSearch,
          isUpdating: false,
          visibleTodos:
            self.visibilityFilter === t.FILTER_ALL
              ? self.data
              : self.data.filter((_todo: t.TodoT) =>
                  self.visibilityFilter === t.FILTER_COMPLETED
                    ? _todo.isCompleted
                    : !_todo.isCompleted
                ),
        };
        setTodosApi(stateUpdated);
      }
    },
  }));
