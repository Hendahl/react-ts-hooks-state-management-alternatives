import * as ts from "../../ts/types";
import * as utils from "../../utils";
import {
  applySnapshot,
  destroy,
  getRoot,
  getSnapshot,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";

export const Todo = types
  .model({
    completed: types.boolean,
    id: types.identifierNumber,
    title: types.string,
  })
  .actions((self) => ({
    toggleTodo() {
      getRoot<TodosModel>(self).toggleTodo(self);
    },
    deleteTodo() {
      getRoot<TodosModel>(self).deleteTodo(self);
    },
    showEdit() {
      getRoot<TodosModel>(self).showEdit(self);
    },
  }));

export const Todos = types
  .model({
    payload: types.optional(types.array(Todo), []),
    isSearching: types.boolean,
    isUpdating: types.boolean,
    visibilityFilter: types.string,
    editing: types.optional(types.array(Todo), []),
    visible: types.optional(types.array(Todo), []),
  })
  .views((self) => ({
    get countCompletedView() {
      return self.payload.filter((_todo) => _todo.completed).length;
    },
    get countAllView() {
      return self.payload.length;
    },
    get visibleView() {
      return self.visibilityFilter === ts.ALL_TODOS
        ? self.payload
        : self.payload.filter((_todo) =>
            self.visibilityFilter === ts.COMPLETED_TODOS
              ? _todo.completed
              : !_todo.completed
          );
    },
    get editingView() {
      return self.editing;
    },
  }))
  .actions((self) => ({
    addTodo(title: string) {
      const id = utils.uuid();
      const newTodo = {
        id,
        title,
        completed: false,
      };
      self.isUpdating = true;
      self.payload.unshift(newTodo);
      self.visibilityFilter = ts.ALL_TODOS;
    },
    deleteTodo(todo: SnapshotIn<TodoModel>) {
      self.payload.replace(
        self.payload.filter((_todo) => _todo.id !== todo.id)
      );
      self.isUpdating = true;
      destroy(todo);
    },
    deleteTodos() {
      utils.setStoredTodos({
        ...ts.initialTodos,
      });
      applySnapshot(self, ts.initialTodos);
    },
    editTodo(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const stateEditing = self.editing.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
      );
      self.editing.replace(stateEditing);
    },
    filterTodos(visibiltityFilter: string) {
      self.visibilityFilter = visibiltityFilter;
      self.isUpdating = true;
    },
    getTodos() {
      applySnapshot(self, utils.getStoredTodos());
    },
    saveTodo() {
      const showEdit = self.editing[0];
      const statePayload = self.payload.map((_todo) =>
        _todo.id === showEdit.id ? { ..._todo, title: showEdit.title } : _todo
      );
      destroy(self.editing);
      self.payload.replace(statePayload);
      self.isUpdating = true;
    },
    showEdit(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const isAllreadyIncluded: boolean = self.editing.length !== 0;
      const todoSnapshot = getSnapshot(self).payload.filter(
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
    toggleTodo(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const statePayload = self.payload.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
      );
      self.payload.replace(statePayload);
      self.isUpdating = true;
    },
    toggleTodos(isAllCompleted: boolean) {
      const statePayload = self.payload.map((_todo) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
          : _todo
      );
      self.payload.replace(statePayload);
      self.isUpdating = true;
    },

    updateTodos() {
      if (self.isUpdating) {
        self.isUpdating = false;
        const stateUpdated = {
          countAll: self.countAllView,
          countCompleted: self.countCompletedView,
          editing: getSnapshot(self).editing,
          payload: getSnapshot(self).payload,
          visibilityFilter: self.visibilityFilter,
          isSearching: self.isSearching,
          isUpdating: false,
          visible:
            self.visibilityFilter === ts.ALL_TODOS
              ? self.payload
              : self.payload.filter((_todo: ts.Todo) =>
                  self.visibilityFilter === ts.COMPLETED_TODOS
                    ? _todo.completed
                    : !_todo.completed
                ),
        };
        utils.setStoredTodos(stateUpdated);
      }
    },
  }));
