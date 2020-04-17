import * as filter from "../../constants/filter";
import * as utils from "../../utils";
import AddForm from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "./progress";
import React, { FC, useEffect, useState } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";

interface TodosProps {
  handleDeleteTodo: DeleteTodo;
  handleChangeTodoTitle: ChangeTodo;
  todo: Todo;
  todos: Todos;
}
const Todos: FC<TodosProps> = () => {
  const [todos, setTodos] = useState<Todos>(utils.getStoredTodos());

  useEffect(() => {
    if (todos.isUpdating) {
      setTodos(utils.updateTodos(todos));
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

  const handleEditingTodo: EditingTodo = (todo) => {
    const allreadyIncluded: boolean = todos.editing.includes(todo);
    setTodos({
      ...todos,
      editing: allreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const handleChangeTodoCompleted: ChangeTodo = (todo) => {
    const payloadState = todos.payload.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
    );
    setTodos({
      ...todos,
      payload: payloadState,
      isUpdating: true,
    });
  };

  const handleChangeTodoTitle: ChangeTodo = (todo) => {
    const editingState = todos.editing.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
    );
    setTodos({
      ...todos,
      editing: editingState,
    });
  };

  const handleSaveTodoTitle: SaveTodoTitle = () => {
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

  const handleChangeTodosCompleted: ChangeTodos = (isAllCompleted) => {
    const payloadState: Todo[] = [
      ...todos.payload.map((todo) =>
        todo.completed === !isAllCompleted
          ? { ...todo, completed: isAllCompleted }
          : todo
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
          handleSaveTodoTitle={handleSaveTodoTitle}
          handleChangeTodoTitle={handleChangeTodoTitle}
          handleEditingTodo={handleEditingTodo}
          todo={todos.editing[0]}
        />
      )}
      <List>
        <AddForm
          todos={todos}
          handleAddTodo={handleAddTodo}
          handleChangeTodosCompleted={handleChangeTodosCompleted}
        />
        {todos.visible.map((_todo) => (
          <Todo
            handleChangeTodoCompleted={handleChangeTodoCompleted}
            handleEditingTodo={handleEditingTodo}
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
