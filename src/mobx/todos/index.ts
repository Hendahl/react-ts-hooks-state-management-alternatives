import * as select from "../../selectors";
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
      applySnapshot(self, select.addTodo(getSnapshot(self), title));
    },
    editTodos(isAllCompleted: boolean) {
      applySnapshot(self, select.editTodos(getSnapshot(self), isAllCompleted));
    },
    editTodo(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      applySnapshot(self, select.editTodo(getSnapshot(self), todo.id));
    },
    deleteTodo(todo: SnapshotIn<TodoModel>) {
      applySnapshot(self, select.deleteTodo(getSnapshot(self), todo.id));
      destroy(todo);
    },
    deleteTodos() {
      applySnapshot(self, select.deleteTodos());
    },
    setFilter(filter: string) {
      applySnapshot(self, select.setFilter(getSnapshot(self), filter));
    },
    updateTodos() {
      applySnapshot(self, select.updateTodos(getSnapshot(self)));
    },
    getTodos() {
      applySnapshot(self, select.getStoredTodos());
    }
  }));

type TodosModel = Instance<typeof Todos>;
