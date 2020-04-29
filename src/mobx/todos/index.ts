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
    changeTodoCompleted() {
      getRoot<TodosModel>(self).changeTodoCompleted(self);
    },
    deleteTodo() {
      getRoot<TodosModel>(self).deleteTodo(self);
    },
    editingTodo() {
      getRoot<TodosModel>(self).editingTodo(self);
    },
  }));

type TodoModel = Instance<typeof Todo>;

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
      return self.visibilityFilter === filter.ALL_TODOS
        ? self.payload
        : self.payload.filter((_todo) =>
            self.visibilityFilter === filter.COMPLETED_TODOS
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
      self.payload.unshift(newTodo);
      self.visibilityFilter = filter.ALL_TODOS;
      self.isUpdating = true;
    },
    changeTodosCompleted(isAllCompleted: boolean) {
      const updatedState = self.payload.map((_todo) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
          : _todo
      );
      self.payload.replace(updatedState);
      self.isUpdating = true;
    },

    editingTodo(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
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

    changeTodoTitle(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const editingState = self.editing.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
      );
      self.editing.replace(editingState);
    },

    changeTodoCompleted(todo: SnapshotIn<TodoModel> | Instance<TodoModel>) {
      const updatedState = self.payload.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
      );
      self.payload.replace(updatedState);
      self.isUpdating = true;
    },
    saveTodoTitle() {
      const editingTodo = self.editing[0];
      const payloadState = self.payload.map((_todo) =>
        _todo.id === editingTodo.id
          ? { ..._todo, title: editingTodo.title }
          : _todo
      );
      destroy(self.editing);
      self.payload.replace(payloadState);
      self.isUpdating = true;
    },
    deleteTodo(todo: SnapshotIn<TodoModel>) {
      self.payload.replace(
        self.payload.filter((_todo) => _todo.id !== todo.id)
      );
      self.isUpdating = true;
      destroy(todo);
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
          countAll: self.countAllView,
          countCompleted: self.countCompletedView,
          payload: getSnapshot(self).payload,
          visibilityFilter: self.visibilityFilter,
          isSearching: self.isSearching,
          isUpdating: self.isUpdating,
          visible: [],
          editing: getSnapshot(self).editing,
        };
        utils.updateTodos(todosState);
      }
    },
    getTodos() {
      applySnapshot(self, utils.getStoredTodos());
    },
    searchTodos(searchTerm: string) {
      const updatedState = self.payload.filter((_todo) =>
        _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      self.visible.replace(updatedState);
      self.isUpdating = true;
    },

    searchToggle() {
      self.isSearching = !self.isSearching;
    },
  }));

type TodosModel = Instance<typeof Todos>;
