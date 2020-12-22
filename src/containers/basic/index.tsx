import * as t from "../../ts/types";
import * as utils from "../../utils";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import PayloadComponent from "../../components/payload";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { getFilteredDataApi, getTodosApi, setTodosApi } from "../../api";

const TodosContainer: FC = () => {
  const [stateTodos, setStateTodos] = useState<t.TodosT>(t.initialTodos);

  useEffect(() => {
    setStateTodos(getTodosApi());
  }, []);

  useEffect(() => {
    if (stateTodos.isUpdating) {
      setStateTodos(getFilteredDataApi(stateTodos));
    }
  }, [stateTodos]);

  const handleAdd: t.Add = (title) => {
    const statePayload = [
      { id: utils.uuid(), isCompleted: false, title: title },
      ...stateTodos.data,
    ];
    setStateTodos({
      ...stateTodos,
      countAll: stateTodos.countAll + 1,
      data: statePayload,
      dataFilter: t.FILTER_ALL,
      isUpdating: true,
    });
  };

  const handleFilter: t.Filter = (dataFilter) => {
    setStateTodos({
      ...stateTodos,
      dataFilter: dataFilter,
      isUpdating: true,
    });
  };

  const handlePayloadVisibility: t.Visibility = () => {
    setStateTodos({
      ...stateTodos,
      isPayloadVisible: !stateTodos.isPayloadVisible,
      isUpdating: true,
    });
  };

  const handleRemove: t.Remove = (todo) => {
    const statePayload = stateTodos.data.filter(
      (_todo) => _todo.id !== todo.id
    );
    setStateTodos({
      ...stateTodos,
      countAll: --stateTodos.countAll,
      countCompleted: statePayload.filter((_todo) => _todo.isCompleted).length,
      isUpdating: true,
      data: statePayload.filter((_todo) => _todo.id !== todo.id),
    });
  };

  const handleRemoveAll: t.RemoveAll = () => {
    setTodosApi({
      ...t.initialTodos,
    });
    setStateTodos({
      ...t.initialTodos,
    });
  };

  const handleSearch: t.Search = (searchTerm) => {
    const stateVisible = stateTodos.data.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStateTodos({
      ...stateTodos,
      dataFilter: t.FILTER_ALL,
      dataFiltered: stateVisible,
    });
  };

  const handleSearchVisibility: t.Visibility = () => {
    setStateTodos({
      ...stateTodos,
      isSearchVisible: !stateTodos.isSearchVisible,
      isUpdating: true,
    });
  };

  const handleSave: t.Save = (todo) => {
    const statePayload = stateTodos.data.map((_todo) =>
      _todo.id === todo.id
        ? {
            ..._todo,
            isCompleted: todo.isCompleted,
            title: todo.title,
          }
        : _todo
    );
    setStateTodos({
      ...stateTodos,
      countCompleted: statePayload.filter((_todo) => _todo.isCompleted).length,
      isUpdating: true,
      data: statePayload,
    });
  };

  const handleToggleAll: t.ToggleAll = (isAllCompleted) => {
    const statePayload = stateTodos.data.map((_todo) =>
      _todo.isCompleted === !isAllCompleted
        ? { ..._todo, isCompleted: isAllCompleted }
        : _todo
    );
    setStateTodos({
      ...stateTodos,
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
      <ProgressComponent isUpdating={stateTodos.isUpdating} />
      <List>
        {stateTodos.isSearchVisible ? (
          <SearchComponent
            searchVisible={handleSearchVisibility}
            search={handleSearch}
            dataFilteredLength={stateTodos.dataFiltered.length}
          />
        ) : (
          <>
            <AddComponent add={handleAdd} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              searchVisible={handleSearchVisibility}
              toggleAll={handleToggleAll}
              todos={stateTodos}
            />
          </>
        )}
        {stateTodos.dataFiltered.map((_todo) => (
          <TodoComponent
            key={_todo.id}
            save={handleSave}
            remove={handleRemove}
            todo={_todo}
          />
        ))}
        <PayloadComponent
          todos={stateTodos}
          payloadVisible={handlePayloadVisibility}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
