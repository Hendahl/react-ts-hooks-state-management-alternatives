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

  const handleAdd = (title: string) => {
    dispatch(add({ title: title }));
  };

  const handleShowSearch: t.ShowSearch = () => {
    dispatch(showSearch());
  };

  const handleSearch: t.Search = (searchTerm) => {
    dispatch(search({ searchTerm: searchTerm }));
  };

  const handleRemove: t.Remove = (todo) => {
    dispatch(remove(todo));
  };

  const handleShowEdit: t.ShowEdit = (todo) => {
    dispatch(showEdit(todo));
  };

  const handleToggle: t.Toggle = (todo) => {
    dispatch(toggle(todo));
  };
  const handleRemoveAll: t.RemoveAll = () => {
    dispatch(removeAll());
  };

  const handleFilter: t.Filter = (visibilityFilter) => {
    dispatch(filter({ filter: visibilityFilter }));
  };

  const handleToggleAll: t.ToggleAll = (isAllCompleted) => {
    dispatch(toggleAll({ isAllCompleted: isAllCompleted }));
  };

  const handleSave: t.Save = () => {
    dispatch(save());
  };

  const handleEdit: t.Edit = (todo) => {
    dispatch(edit(todo));
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          TodosT - Redux - Toolkit
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      {storeTodos.editing.length !== 0 && (
        <EditComponent
          edit={handleEdit}
          save={handleSave}
          showEdit={handleShowEdit}
          todo={storeTodos.editing[0]}
        />
      )}
      <List>
        {storeTodos.isSearching ? (
          <SearchComponent
            showSearch={handleShowSearch}
            search={handleSearch}
            visibleTodosLength={storeTodos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent add={handleAdd} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              showSearch={handleShowSearch}
              toggleAll={handleToggleAll}
              todos={storeTodos}
            />
          </>
        )}
        {storeTodos.visibleTodos.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            showEdit={handleShowEdit}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodosContainer;
