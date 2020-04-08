import * as utils from "../../utils";
import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect, useState } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import * as filter from "../../constants/filter";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";

interface TodosProps {
  handleDelete: Delete;
  handleEdit: Edit;
  todo: Todo;
  todos: Todos;
}

const Todos: FC<TodosProps> = () => {
  const [todos, setTodos] = useState<Todos>(utils.getStoredTodos());
  useEffect(() => {
    if (todos.isUpdating) {
      const payloadState: Todo[] = [...todos.payload];

      setTodos({
        ...todos,
        countCompleted: payloadState.filter((_todo) => _todo.completed).length,
        isUpdating: false,
        visible:
          todos.visibilityFilter === filter.ALL_TODOS
            ? payloadState
            : payloadState.filter((_todo) =>
                todos.visibilityFilter === filter.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              ),
      });
      utils.setStoredTodos(todos);
    }
  }, [todos]);

  const handleAdd: Add = (title) => {
    setTodos({
      ...todos,
      countAll: todos.countAll + 1,
      payload: [
        { id: utils.uuid(), completed: false, title: title },
        ...todos.payload,
      ],
      isUpdating: true,
      visibilityFilter: filter.ALL_TODOS,
    });
  };

  const handleDelete: Delete = (todo) => {
    setTodos({
      ...todos,
      countAll: todos.countAll - 1,
      payload: todos.payload.filter((_todo) => _todo.id !== todo.id),
      isUpdating: true,
    });
  };

  const handleDeleteAll: DeleteAll = () => {
    const defaultValues = utils.initialTodos;
    utils.setStoredTodos({
      ...defaultValues,
    });
    setTodos({
      ...defaultValues,
    });
  };

  const handleEditCompleted: Edit = (editTodo) => {
    const payloadState: Todo[] = [
      ...todos.payload.map((_todo) =>
        _todo.id === editTodo.id
          ? { ..._todo, completed: !_todo.completed }
          : _todo
      ),
    ];
    setTodos({
      ...todos,
      payload: payloadState,
      isUpdating: true,
    });
  };

  const handleEditing: Editing = (todo: Todo) => {
    /* Since we only handle edit of one Todo at the time we toogle the existence, if you need a multi editing -> you should
    rewrite this... */
    const allreadyIncluded: boolean = todos.editing.includes(todo);
    console.log(allreadyIncluded);
    setTodos({
      ...todos,
      editing: allreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const handleEditTitle: Edit = (editTodo) => {
    const editingState: Todo[] = [
      ...todos.payload.map((_todo) =>
        _todo.id === editTodo.id
          ? { ..._todo, completed: editTodo.completed, title: editTodo.title }
          : _todo
      ),
    ];
    setTodos({
      ...todos,
      editing: editingState,
      isUpdating: true,
    });
  };

  const handleSave = () => {
    const editingTodo = todos.editing[0];
    const payloadState: Todo[] = [
      ...todos.payload.map((_todo) =>
        _todo.id === editingTodo.id
          ? { ..._todo, title: editingTodo.title }
          : _todo
      ),
    ];
    setTodos({
      ...todos,
      payload: payloadState,
      editing: [],
      isUpdating: true,
    });
  };

  const handleEditAll: EditAll = (isAllCompleted) => {
    const payloadState: Todo[] = [
      ...todos.payload.map((_todo) =>
        _todo.completed === !isAllCompleted
          ? { ..._todo, completed: isAllCompleted }
          : _todo
      ),
    ];
    setTodos({
      ...todos,
      payload: payloadState,
      isUpdating: true,
    });
  };

  const handleFilter: Filter = (visibilityFilter) => {
    setTodos({
      ...todos,
      visibilityFilter: visibilityFilter,
      isUpdating: true,
    });
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Basic
        </Box>
      </Typography>
      <Progress isUpdating={todos.isUpdating} />
      {todos.editing.length !== 0 && (
        <EditForm
          handleSave={handleSave}
          handleEditTitle={handleEditTitle}
          handleEditing={handleEditing}
          todo={todos.editing[0]}
        />
      )}

      <List>
        <Add
          todos={todos}
          handleAdd={handleAdd}
          handleEditAll={handleEditAll}
        />
        {todos.visible.map((_todo) => (
          <Todo
            handleEditCompleted={handleEditCompleted}
            handleEditing={handleEditing}
            handleDelete={handleDelete}
            key={_todo.id}
            todo={_todo}
          />
        ))}
        <Filter
          handleDeleteAll={handleDeleteAll}
          handleFilter={handleFilter}
          todos={todos}
        />
      </List>
    </Container>
  );
};

export default Todos;
