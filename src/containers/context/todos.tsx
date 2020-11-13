import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import PayloadComponent from "../../components/payload";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useContext, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../stores/context";

const TodosContainer: FC = () => {
  const { todos, dispatch } = useContext(Context);

  useEffect(() => {
    if (todos.isUpdating) {
      dispatch({ type: t.UPDATE });
    }
  }, [todos, dispatch]);

  const handleAdd = (title: string) => {
    dispatch({ type: t.ADD, title: title });
  };

  const handleShowPayload: t.Show = () => {
    dispatch({ type: t.SHOW_PAYLOAD });
  };

  const handleShowSearch: t.Show = () => {
    dispatch({ type: t.SHOW_SEARCH });
  };

  const handleSearch: t.Search = (searchTerm) => {
    dispatch({ type: t.SEARCH, searchTerm });
  };

  const handleRemove: t.Remove = (todo) => {
    dispatch({ type: t.REMOVE, id: todo.id });
  };

  const handleToggle: t.Toggle = (todo) => {
    dispatch({ type: t.TOGGLE, todo: todo });
  };

  const handleRemoveAll: t.RemoveAll = () => {
    dispatch({ type: t.REMOVE_ALL });
  };

  const handleFilter: t.Filter = (visibilityFilter) => {
    dispatch({
      type: t.FILTER,
      visibiltityFilter: visibilityFilter,
    });
  };

  const handleToggleAll: t.ToggleAll = (isAllCompleted) => {
    dispatch({
      type: t.TOGGLE_ALL,
      isAllCompleted: isAllCompleted,
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
      <List>
        {todos.isShowSearch ? (
          <SearchComponent
            showSearch={handleShowSearch}
            search={handleSearch}
            visibleTodosLength={todos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent add={handleAdd} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              showSearch={handleShowSearch}
              toggleAll={handleToggleAll}
              todos={todos}
            />
          </>
        )}
        {todos.visibleTodos.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
        <PayloadComponent todos={todos} showPayload={handleShowPayload} />
      </List>
    </Container>
  );
};

export default TodosContainer;
