import * as utils from "../../utils";
import AddForm from "./add";
import Box from "@material-ui/core/Box";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect, useState } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import * as filter from "../../constants/filter";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";

interface TodosProps {
  handleDeleteTodo: DeleteTodo;
  handleChangeTodo: ChangeTodo;
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

  const handleAddTodo: AddTodo = (title) => {
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

  const handleDeleteTodo: DeleteTodo = (todo) => {
    setTodos({
      ...todos,
      countAll: todos.countAll - 1,
      payload: todos.payload.filter((_todo) => _todo.id !== todo.id),
      isUpdating: true,
    });
  };

  const handleDeleteTodos: DeleteTodos = () => {
    const defaultValues = utils.initialTodos;
    utils.setStoredTodos({
      ...defaultValues,
    });
    setTodos({
      ...defaultValues,
    });
  };

  const handleEditCompleted: ChangeTodo = (todo) => {
    const payloadState: Todo[] = [
      ...todos.payload.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
      ),
    ];
    setTodos({
      ...todos,
      payload: payloadState,
      isUpdating: true,
    });
  };

  const handleEditing: EditingTodo = (todo) => {
    /* Since we only handle edit of one Todo at the time we toogle the existence, if you need a multi editing -> you should
    rewrite this... */
    const allreadyIncluded: boolean = todos.editing.includes(todo);
    setTodos({
      ...todos,
      editing: allreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const handleChangeTodo: ChangeTodo = (todo) => {
    const editingState: Todo[] = [
      ...todos.payload.map((_todo) =>
        _todo.id === todo.id
          ? { ..._todo, completed: todo.completed, title: todo.title }
          : _todo
      ),
    ];
    setTodos({
      ...todos,
      editing: editingState,
      isUpdating: true,
    });
  };

  const handleSaveTodo: SaveTodo = () => {
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

  /* Since we only change "completed" we have one Boolean as parameter*/
  const handleChangeTodos: ChangeTodos = (isAllCompleted) => {
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

  const handleFilterTodos: FilterTodos = (visibilityFilter) => {
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
          handleSaveTodo={handleSaveTodo}
          handleChangeTodo={handleChangeTodo}
          handleEditing={handleEditing}
          todo={todos.editing[0]}
        />
      )}
      <List>
        <AddForm
          todos={todos}
          handleAddTodo={handleAddTodo}
          handleChangeTodos={handleChangeTodos}
        />
        {todos.visible.map((_todo) => (
          <Todo
            handleEditCompleted={handleEditCompleted}
            handleEditing={handleEditing}
            handleDeleteTodo={handleDeleteTodo}
            key={_todo.id}
            todo={_todo}
          />
        ))}
        <FilterTodos
          handleDeleteTodos={handleDeleteTodos}
          handleFilterTodos={handleFilterTodos}
          todos={todos}
        />
      </List>
    </Container>
  );
};

export default Todos;
