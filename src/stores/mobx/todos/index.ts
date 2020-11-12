import * as t from "../../../ts/types";
import * as utils from "../../../utils";
import {
  applySnapshot,
  destroy,
  getRoot,
  getSnapshot,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { getTodosApi, setTodosApi } from "../../../api";

export const TodoT = types
  .model({
    completed: types.boolean,
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
    isSearching: types.boolean,
    isUpdating: types.boolean,
    visibilityFilter: types.string,
    editing: types.optional(types.array(TodoT), []),
    visibleTodos: types.optional(types.array(TodoT), []),
  })
  .views((self) => ({
    get countCompletedView() {
      return self.data.filter((_todo) => _todo.completed).length;
    },
    get countAllView() {
      return self.data.length;
    },
    get visibleTodosView() {
      return self.visibilityFilter === t.FILTER_ALL
        ? self.data
        : self.data.filter((_todo) =>
            self.visibilityFilter === t.FILTER_COMPLETED
              ? _todo.completed
              : !_todo.completed
          );
    },
    get editingView() {
      return self.editing;
    },
  }))
  .actions((self) => ({
    add(title: string) {
      const id = utils.uuid();
      const newTodo = {
        id,
        title,
        completed: false,
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
    edit(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const stateEditing = self.editing.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
      );
      self.editing.replace(stateEditing);
    },
    filter(visibiltityFilter: string) {
      self.visibilityFilter = visibiltityFilter;
      self.isUpdating = true;
    },
    get() {
      applySnapshot(self, getTodosApi());
    },
    save() {
      const showEdit = self.editing[0];
      const statePayload = self.data.map((_todo) =>
        _todo.id === showEdit.id ? { ..._todo, title: showEdit.title } : _todo
      );
      destroy(self.editing);
      self.data.replace(statePayload);
      self.isUpdating = true;
    },
    showEdit(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const isAllreadyIncluded: boolean = self.editing.length !== 0;
      const todoSnapshot = getSnapshot(self).data.filter(
        (_todo) => _todo.id === todo.id
      );
      if (isAllreadyIncluded) {
        self.editing.replace(
          self.editing.filter((_todo) => _todo.id !== todoSnapshot[0].id)
        );
        self.isUpdating = true;
        destroy(todo);
      } else {
        self.editing.push(todoSnapshot[0]);
        self.isUpdating = true;
      }
    },
    toggle(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const statePayload = self.data.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
      );
      self.data.replace(statePayload);
      self.isUpdating = true;
    },
    toggleAll(isAllCompleted: boolean) {
      const statePayload = self.data.map((_todo) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
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
          editing: getSnapshot(self).editing,
          data: getSnapshot(self).data,
          visibilityFilter: self.visibilityFilter,
          isSearching: self.isSearching,
          isUpdating: false,
          visibleTodos:
            self.visibilityFilter === t.FILTER_ALL
              ? self.data
              : self.data.filter((_todo: t.TodoT) =>
                  self.visibilityFilter === t.FILTER_COMPLETED
                    ? _todo.completed
                    : !_todo.completed
                ),
        };
        setTodosApi(stateUpdated);
      }
    },
  }));
