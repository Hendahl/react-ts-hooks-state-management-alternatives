import * as t from "../../ts/types";
import * as utils from "../../utils";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DataComponent from "../../components/data";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { getTodosApi, setTodosApi } from "../../api";

const TodosContainer: FC = () => {
  const [stateTodos, setStateTodos] = useState<t.TodosT>(t.initialTodos);
  useEffect(() => {
    setStateTodos(getTodosApi());
  }, []);

  useEffect(() => {
    if (stateTodos.isUpdating) {
      const stateUpdated: t.TodosT = {
        ...stateTodos,
        isUpdating: false,
        visibleTodos:
          stateTodos.visibilityFilter === t.FILTER_ALL
            ? stateTodos.data
            : stateTodos.data.filter((_todo) =>
                stateTodos.visibilityFilter === t.FILTER_COMPLETED
                  ? _todo.isCompleted
                  : !_todo.isCompleted
              ),
      };
      setTodosApi(stateUpdated);
      setStateTodos(stateUpdated);
    }
  }, [stateTodos]);

  const add: t.Add = (title) => {
    const statePayload = [
      { id: utils.uuid(), isCompleted: false, title: title },
      ...stateTodos.data,
    ];
    setStateTodos({
      ...stateTodos,
      countAll: stateTodos.countAll + 1,
      isUpdating: true,
      data: statePayload,
      visibilityFilter: t.FILTER_ALL,
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

  const handleFilter: t.Filter = (visibilityFilter) => {
    setStateTodos({
      ...stateTodos,
      isUpdating: true,
      visibilityFilter: visibilityFilter,
    });
  };

  const handleSearch: t.Search = (searchTerm) => {
    const stateVisible = stateTodos.data.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStateTodos({
      ...stateTodos,
      visibilityFilter: t.FILTER_ALL,
      visibleTodos: stateVisible,
    });
  };

  const handleShowSearch: t.ShowSearch = () => {
    setStateTodos({
      ...stateTodos,
      isSearching: !stateTodos.isSearching,
      isUpdating: true,
    });
  };

  const handleToggle: t.Toggle = (todo) => {
    const statePayload = stateTodos.data.map((_todo) =>
      _todo.id === todo.id
        ? { ..._todo, isCompleted: !_todo.isCompleted }
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
        {stateTodos.isSearching ? (
          <SearchComponent
            showSearch={handleShowSearch}
            search={handleSearch}
            visibleTodosLength={stateTodos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent add={add} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              showSearch={handleShowSearch}
              toggleAll={handleToggleAll}
              todos={stateTodos}
            />
          </>
        )}
        {stateTodos.visibleTodos.map((_todo) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
        <DataComponent todos={stateTodos} />
      </List>
    </Container>
  );
};

export default TodosContainer;
