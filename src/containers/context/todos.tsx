import { Context } from "../../stores/context";
import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "../../components/edit";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useContext, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";

const TodosContainer: FC = () => {
  const { todos, dispatch } = useContext(Context);

  useEffect(() => {
    if (todos.isUpdating) {
      dispatch({ type: t.UPDATE });
    }
  }, [todos, dispatch]);

  const handleAddTodo = (title: string) => {
    dispatch({ type: t.ADD, title: title });
  };

  const handleShowSearch: t.ShowSearch = () => {
    dispatch({ type: t.SHOW_SEARCH });
  };

  const handleSearchTodos: t.SearchTodos = (searchTerm) => {
    dispatch({ type: t.SEARCH, searchTerm });
  };

  const handleRemoveTodo: t.RemoveTodo = (todo) => {
    dispatch({ type: t.REMOVE, id: todo.id });
  };

  const handleShowEdit: t.ShowEdit = (todo) => {
    dispatch({ type: t.SHOW_EDIT, todo: todo });
  };

  const handleToggleTodo: t.ToggleTodo = (todo) => {
    dispatch({ type: t.TOGGLE, todo: todo });
  };

  const handleRemoveTodos: t.RemoveTodos = () => {
    dispatch({ type: t.REMOVE_ALL });
  };

  const handleFilterTodos: t.FilterTodos = (visibilityFilter) => {
    dispatch({
      type: t.FILTER,
      visibiltityFilter: visibilityFilter,
    });
  };

  const handleToggleTodos: t.ToggleTodos = (isAllCompleted) => {
    dispatch({
      type: t.TOGGLE_ALL,
      isAllCompleted: isAllCompleted,
    });
  };

  const handleSaveTodo: t.SaveTodo = () => {
    dispatch({
      type: t.SAVE,
    });
  };

  const handleEditTodo: t.EditTodo = (todo) => {
    dispatch({
      type: t.EDIT,
      todo: todo,
    });
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Context
        </Box>
      </Typography>
      <ProgressComponent isUpdating={todos.isUpdating} />
      {todos.editing.length !== 0 && (
        <EditComponent
          onEditTodo={handleEditTodo}
          onSaveTodo={handleSaveTodo}
          onShowEdit={handleShowEdit}
          todo={todos.editing[0]}
        />
      )}
      <List>
        {todos.isSearching ? (
          <SearchComponent
            onShowSearch={handleShowSearch}
            onSearchTodos={handleSearchTodos}
            visibleTodosLength={todos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent onAddTodo={handleAddTodo} />
            <FilterComponent
              onRemoveTodos={handleRemoveTodos}
              onFilterTodos={handleFilterTodos}
              onShowSearch={handleShowSearch}
              onToggleTodos={handleToggleTodos}
              todos={todos}
            />
          </>
        )}
        {todos.visibleTodos.map((_todo: t.Todo) => (
          <TodoComponent
            key={_todo.id}
            onRemoveTodo={handleRemoveTodo}
            onShowEdit={handleShowEdit}
            onToggleTodo={handleToggleTodo}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodosContainer;
