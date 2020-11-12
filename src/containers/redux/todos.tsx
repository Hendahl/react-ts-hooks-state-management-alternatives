import * as actions from "../../stores/redux/todos/actions";
import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "../../components/edit";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const TodosContainer: FC = () => {
  const typedUseSelector: TypedUseSelectorHook<t.TodosI> = useSelector;
  const storeTodos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTodos());
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(actions.updateTodos());
    }
  }, [storeTodos, dispatch]);

  const handleAddTodo = (title: string) => {
    dispatch(actions.addTodo(title));
  };

  const handleShowSearch: t.ShowSearch = () => {
    dispatch({ type: t.SHOW_SEARCH });
  };

  const handleSearchTodos: t.SearchTodos = (searchTerm) => {
    dispatch(actions.searchTodos(searchTerm));
  };

  const handleRemoveTodo: t.RemoveTodo = (todo) => {
    dispatch(actions.removeTodo(todo));
  };

  const handleShowEdit: t.ShowEdit = (todo) => {
    dispatch(actions.showEdit(todo));
  };

  const handleToggleTodo: t.ToggleTodo = (todo) => {
    dispatch(actions.toggleTodo(todo));
  };

  const handleRemoveTodos: t.RemoveTodos = () => {
    dispatch(actions.removeTodos());
  };

  const handleFilterTodos: t.FilterTodos = (visibilityFilter) => {
    dispatch(actions.filterTodos(visibilityFilter));
  };

  const handleToggleTodos: t.ToggleTodos = (isAllCompleted) => {
    dispatch(actions.toggleTodos(isAllCompleted));
  };

  const handleSaveTodo: t.SaveTodo = () => {
    dispatch(actions.saveTodo());
  };

  const handleEditTodo: t.EditTodo = (todo) => {
    dispatch(actions.editTodo(todo));
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          TodosT - Redux
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      {storeTodos.editing.length !== 0 && (
        <EditComponent
          editTodo={handleEditTodo}
          saveTodo={handleSaveTodo}
          showEdit={handleShowEdit}
          todo={storeTodos.editing[0]}
        />
      )}
      <List>
        {storeTodos.isSearching ? (
          <SearchComponent
            showSearch={handleShowSearch}
            searchTodos={handleSearchTodos}
            visibleTodosLength={storeTodos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent addTodo={handleAddTodo} />
            <FilterComponent
              removeTodos={handleRemoveTodos}
              filterTodos={handleFilterTodos}
              showSearch={handleShowSearch}
              toggleTodos={handleToggleTodos}
              todos={storeTodos}
            />
          </>
        )}
        {storeTodos.visibleTodos.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            removeTodo={handleRemoveTodo}
            showEdit={handleShowEdit}
            toggleTodo={handleToggleTodo}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodosContainer;
