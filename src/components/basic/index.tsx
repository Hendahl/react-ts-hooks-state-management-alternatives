import * as utils from "../../utils";
import AddForm from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect, useState } from "react";
import SearchForm from "./search";
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
    setTodos(utils.addTodo(todos, title));
  };

  const handleDeleteTodo: DeleteTodo = (todo) => {
    setTodos(utils.deleteTodo(todos, todo.id));
  };

  const handleDeleteTodos: DeleteTodos = () => {
    setTodos(utils.deleteTodos());
  };

  const handleEditingTodo: EditingTodo = (todo) => {
    setTodos(utils.editingTodo(todos, todo));
  };

  const handleChangeTodoCompleted: ChangeTodo = (todo) => {
    setTodos(utils.changeTodoCompleted(todos, todo));
  };

  const handleChangeTodoTitle: ChangeTodo = (todo) => {
    setTodos(utils.changeTodoTitle(todos, todo));
  };

  const handleSaveTodoTitle: SaveTodoTitle = () => {
    setTodos(utils.saveTodoTitle(todos));
  };

  const handleChangeTodosCompleted: ChangeTodos = (isAllCompleted) => {
    setTodos(utils.changeTodosCompleted(todos, isAllCompleted));
  };

  const handleFilterTodos: FilterTodos = (visibilityFilter) => {
    setTodos(utils.setFilter(todos, visibilityFilter));
  };

  const handleSearchToggle: SearchToggle = () => {
    setTodos(utils.searchToggle(todos));
  };

  const handleSearchTodos: SearchTodos = (searchTerm) => {
    setTodos(utils.searchTodos(todos, searchTerm));
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
        {todos.isSearching ? (
          <SearchForm
            handleSearchToggle={handleSearchToggle}
            handleSearchTodos={handleSearchTodos}
            todos={todos}
          />
        ) : (
          <>
            <AddForm todos={todos} handleAddTodo={handleAddTodo} />
            <FilterTodos
              handleChangeTodosCompleted={handleChangeTodosCompleted}
              handleDeleteTodos={handleDeleteTodos}
              handleFilterTodos={handleFilterTodos}
              handleSearchToggle={handleSearchToggle}
              todos={todos}
            />
          </>
        )}
        {todos.visible.map((_todo) => (
          <Todo
            handleChangeTodoCompleted={handleChangeTodoCompleted}
            handleEditingTodo={handleEditingTodo}
            handleDeleteTodo={handleDeleteTodo}
            key={_todo.id}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
