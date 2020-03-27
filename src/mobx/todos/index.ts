import * as utils from "../../utils";
import {
  applySnapshot,
  destroy,
  getRoot,
  getSnapshot,
  Instance,
  SnapshotIn,
  types
} from "mobx-state-tree";

export const Todo = types
  .model({
    id: types.identifierNumber,
    completed: types.boolean,
    title: types.string
  })
  .actions(self => ({
    editTodo() {
      getRoot<TodosModel>(self).editTodo(self);
    },
    deleteTodo() {
      getRoot<TodosModel>(self).deleteTodo(self);
    }
  }));

type TodoModel = Instance<typeof Todo>;

export const Todos = types
  .model({
    countAll: types.number,
    countCompleted: types.number,
    payload: types.optional(types.array(Todo), []),
    isUpdating: types.boolean,
    visibilityFilter: types.string,
    visible: types.optional(types.array(Todo), [])
  })
  .actions(self => ({
    addTodo(title: string) {
      applySnapshot(self, utils.addTodo(getSnapshot(self), title));
    },
    editTodos(isAllCompleted: boolean) {
      applySnapshot(self, utils.editTodos(getSnapshot(self), isAllCompleted));
    },
    editTodo(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      applySnapshot(self, utils.editTodo(getSnapshot(self), todo.id));
    },
    deleteTodo(todo: SnapshotIn<TodoModel>) {
      applySnapshot(self, utils.deleteTodo(getSnapshot(self), todo.id));
      destroy(todo);
    },
    deleteTodos() {
      applySnapshot(self, utils.deleteTodos());
    },
    setFilter(visibilityFilter: string) {
      applySnapshot(self, utils.setFilter(getSnapshot(self), visibilityFilter));
    },
    updateTodos() {
      applySnapshot(self, utils.updateTodos(getSnapshot(self)));
    },
    getTodos() {
      applySnapshot(self, utils.getStoredTodos());
    }
  }));

type TodosModel = Instance<typeof Todos>;
