import React, { FC, useEffect, useState } from "react";
import * as t from "../../ts/types";
import * as utils from "../../utils";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import PayloadComponent from "../../components/payload";
import ProgressComponent from "../../components/progress";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { getFilteredDataApi, getTodosApi, setTodosApi } from "../../api";

const TodosContainer: FC = () => {
  const [todosState, setTodosState] = useState<t.TodosT>(t.initialTodos);

  useEffect(() => {
    setTodosState(getTodosApi());
  }, []);

  useEffect(() => {
    if (todosState.isUpdating) {
      setTodosState(getFilteredDataApi(todosState));
    }
  }, [todosState]);

  const handleAdd: t.Add = (title) => {
    const statePayload = [
      { id: utils.uuid(), isCompleted: false, title: title },
      ...todosState.data,
    ];
    setTodosState({
      ...todosState,
      countAll: todosState.countAll + 1,
      data: statePayload,
      dataFilter: t.FILTER_ALL,
      isUpdating: true,
    });
  };

  const handleFilter: t.Filter = (dataFilter) => {
    setTodosState({
      ...todosState,
      dataFilter: dataFilter,
      isUpdating: true,
    });
  };

  const handlePayloadVisibility: t.Visibility = () => {
    setTodosState({
      ...todosState,
      isPayloadVisible: !todosState.isPayloadVisible,
      isUpdating: true,
    });
  };

  const handleRemove: t.Remove = (todo) => {
    const statePayload = todosState.data.filter(
      (_todo) => _todo.id !== todo.id
    );
    setTodosState({
      ...todosState,
      countAll: --todosState.countAll,
      countCompleted: statePayload.filter((_todo) => _todo.isCompleted).length,
      isUpdating: true,
      data: statePayload.filter((_todo) => _todo.id !== todo.id),
    });
  };

  const handleRemoveAll: t.RemoveAll = () => {
    setTodosApi({
      ...t.initialTodos,
    });
    setTodosState({
      ...t.initialTodos,
    });
  };

  const handleSearch: t.Search = (searchTerm) => {
    const stateVisible = todosState.data.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTodosState({
      ...todosState,
      dataFilter: t.FILTER_ALL,
      dataFiltered: stateVisible,
    });
  };

  const handleSearchVisibility: t.Visibility = () => {
    setTodosState({
      ...todosState,
      isSearchVisible: !todosState.isSearchVisible,
      isUpdating: true,
    });
  };

  const handleToggle: t.Toggle = (todo) => {
    const statePayload = todosState.data.map((_todo) =>
      _todo.id === todo.id
        ? { ..._todo, isCompleted: !_todo.isCompleted }
        : _todo
    );
    setTodosState({
      ...todosState,
      countCompleted: statePayload.filter((_todo) => _todo.isCompleted).length,
      isUpdating: true,
      data: statePayload,
    });
  };

  const handleToggleAll: t.ToggleAll = (isAllCompleted) => {
    const statePayload = todosState.data.map((_todo) =>
      _todo.isCompleted === !isAllCompleted
        ? { ..._todo, isCompleted: isAllCompleted }
        : _todo
    );
    setTodosState({
      ...todosState,
      countCompleted: statePayload.filter((_todo) => _todo.isCompleted).length,
      data: statePayload,
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
      <ProgressComponent isUpdating={todosState.isUpdating} />
      <List>
        {todosState.isSearchVisible ? (
          <SearchComponent
            searchVisible={handleSearchVisibility}
            search={handleSearch}
            dataFilteredLength={todosState.dataFiltered.length}
          />
        ) : (
          <>
            <AddComponent add={handleAdd} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              searchVisible={handleSearchVisibility}
              toggleAll={handleToggleAll}
              todos={todosState}
            />
          </>
        )}
        {todosState.dataFiltered.map((_todo) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
        <PayloadComponent
          todos={todosState}
          payloadVisible={handlePayloadVisibility}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
