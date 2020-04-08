import * as utils from "../../utils";
import * as filter from "../../constants/filter";
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
    id: types.identifierNumber,
    completed: types.boolean,
    title: types.string,
  })
  .actions((self) => ({
    editTodo() {
      getRoot<TodosModel>(self).editTodo(self);
    },
    deleteTodo() {
      getRoot<TodosModel>(self).deleteTodo(self);
    },
  }));

type TodoModel = Instance<typeof Todo>;

export const Todos = types
  .model({
    payload: types.optional(types.array(Todo), []),
    isUpdating: types.boolean,
    visibilityFilter: types.string,
  })
  .views((self) => ({
    get countCompleted() {
      return self.payload.filter((_todo) => _todo.completed).length;
    },
    get countAll() {
      return self.payload.length;
    },
    get visibleTodos() {
      return self.visibilityFilter === filter.ALL_TODOS
        ? self.payload
        : self.payload.filter((_todo) =>
            self.visibilityFilter === filter.COMPLETED_TODOS
              ? _todo.completed
              : !_todo.completed
          );
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
      self.payload.push(newTodo);
      self.visibilityFilter = filter.ALL_TODOS;
      self.isUpdating = true;
    },
    editTodos(isAllCompleted: boolean) {
      const updatedState = self.payload.map((_todo) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
          : _todo
      );
      self.payload.replace(updatedState);
      self.isUpdating = true;
    },
    editTodo(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const updatedState = self.payload.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
      );
      self.payload.replace(updatedState);
      self.isUpdating = true;
    },
    deleteTodo(todo: SnapshotIn<TodoModel>) {
      destroy(todo);
      self.payload.replace(
        self.payload.filter((_todo) => _todo.id !== todo.id)
      );
      self.isUpdating = true;
    },
    deleteTodos() {
      applySnapshot(self, utils.deleteTodos());
    },
    setFilter(visibiltityFilter: string) {
      self.visibilityFilter = visibiltityFilter;
      self.isUpdating = true;
    },
    updateTodos() {
      /*
      This is not a Mobx Pattern just for this demo app, take a look in the mobx branch to see how it should be done
      */
      if (self.isUpdating) {
        self.isUpdating = false;
        const todosState = {
          countAll: self.countAll,
          countCompleted: self.countCompleted,
          payload: getSnapshot(self).payload,
          visibilityFilter: self.visibilityFilter,
          isUpdating: self.isUpdating,
          visible: [],
          editing: [],
        };
        utils.updateTodos(todosState);
      }
    },
    getTodos() {
      applySnapshot(self, utils.getStoredTodos());
    },
  }));

type TodosModel = Instance<typeof Todos>;
