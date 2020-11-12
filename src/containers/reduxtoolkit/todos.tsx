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
import {
  add,
  edit,
  filter,
  get,
  remove,
  removeAll,
  save,
  search,
  showEdit,
  showSearch,
  toggle,
  toggleAll,
  update,
} from "../../stores/reduxtoolkit/todos";
import { getTodosApi } from "../../api";
import { RootState } from "../../stores/reduxtoolkit/rootReducer";
import { useDispatch, useSelector } from "react-redux";

const TodosContainer: FC = () => {
  const dispatch = useDispatch();
  /*const { editing, isUpdating, visibleTodos, isSearching } = useSelector(
    (state: RootState) => state.todos
  );*/
  const storeTodos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(get(getTodosApi()));
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(update());
    }
  }, [storeTodos.isUpdating, dispatch]);

  const handleAddTodo = (title: string) => {
    dispatch(add({ title: title }));
  };

  const handleShowSearch: t.ShowSearch = () => {
    dispatch(showSearch());
  };

  const handleSearchTodos: t.SearchTodos = (searchTerm) => {
    dispatch(search({ searchTerm: searchTerm }));
  };

  const handleRemoveTodo: t.RemoveTodo = (todo) => {
    dispatch(remove(todo));
  };

  const handleShowEdit: t.ShowEdit = (todo) => {
    dispatch(showEdit(todo));
  };

  const handleToggleTodo: t.ToggleTodo = (todo) => {
    dispatch(toggle(todo));
  };
  const handleRemoveTodos: t.RemoveTodos = () => {
    dispatch(removeAll());
  };

  const handleFilterTodos: t.FilterTodos = (visibilityFilter) => {
    dispatch(filter({ filter: visibilityFilter }));
  };

  const handleToggleTodos: t.ToggleTodos = (isAllCompleted) => {
    dispatch(toggleAll({ isAllCompleted: isAllCompleted }));
  };

  const handleSaveTodo: t.SaveTodo = () => {
    dispatch(save());
  };

  const handleEditTodo: t.EditTodo = (todo) => {
    dispatch(edit(todo));
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux - Toolkit
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      {storeTodos.editing.length !== 0 && (
        <EditComponent
          onEditTodo={handleEditTodo}
          onSaveTodo={handleSaveTodo}
          onShowEdit={handleShowEdit}
          todo={storeTodos.editing[0]}
        />
      )}
      <List>
        {storeTodos.isSearching ? (
          <SearchComponent
            onShowSearch={handleShowSearch}
            onSearchTodos={handleSearchTodos}
            visibleTodosLength={storeTodos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent onAddTodo={handleAddTodo} />
            <FilterComponent
              onRemoveTodos={handleRemoveTodos}
              onFilterTodos={handleFilterTodos}
              onShowSearch={handleShowSearch}
              onToggleTodos={handleToggleTodos}
              todos={storeTodos}
            />
          </>
        )}
        {storeTodos.visibleTodos.map((_todo: t.Todo) => (
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
