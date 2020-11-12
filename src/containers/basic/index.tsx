import * as t from "../../ts/types";
import * as utils from "../../utils";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "../../components/edit";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { getTodosApi, setTodosApi } from "../../api";

const Todos: FC = () => {
  const [stateTodos, setStateTodos] = useState<t.Todos>(t.initialTodos);

  useEffect(() => {
    setStateTodos(getTodosApi());
  }, []);

  useEffect(() => {
    if (stateTodos.isUpdating) {
      const stateUpdated: t.Todos = {
        ...stateTodos,
        isUpdating: false,
        visibleTodos:
          stateTodos.visibilityFilter === t.FILTER_ALL
            ? stateTodos.data
            : stateTodos.data.filter((_todo) =>
                stateTodos.visibilityFilter === t.FILTER_COMPLETED
                  ? _todo.completed
                  : !_todo.completed
              ),
      };
      setTodosApi(stateUpdated);
      setStateTodos(stateUpdated);
    }
  }, [stateTodos]);

  const addTodo: t.AddTodo = (title) => {
    const statePayload = [
      { id: utils.uuid(), completed: false, title: title },
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

  const handleRemoveTodo: t.RemoveTodo = (todo) => {
    const statePayload = stateTodos.data.filter(
      (_todo) => _todo.id !== todo.id
    );
    setStateTodos({
      ...stateTodos,
      countAll: --stateTodos.countAll,
      countCompleted: statePayload.length,
      isUpdating: true,
      data: statePayload.filter((_todo) => _todo.id !== todo.id),
    });
  };

  const handleRemoveTodos: t.RemoveTodos = () => {
    setTodosApi({
      ...t.initialTodos,
    });
    setStateTodos({
      ...t.initialTodos,
    });
  };

  const handleEditTodo: t.EditTodo = (todo) => {
    const stateEditing = stateTodos.editing.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
    );
    setStateTodos({
      ...stateTodos,
      editing: stateEditing,
    });
  };

  const handleFilterTodos: t.FilterTodos = (visibilityFilter) => {
    setStateTodos({
      ...stateTodos,
      isUpdating: true,
      visibilityFilter: visibilityFilter,
    });
  };

  const handleSaveTodo: t.SaveTodo = () => {
    const stateTodo = stateTodos.editing[0];
    const statePayload: t.Todo[] = [
      ...stateTodos.data.map((_todo) =>
        _todo.id === stateTodo.id ? { ..._todo, title: stateTodo.title } : _todo
      ),
    ];
    setStateTodos({
      ...stateTodos,
      editing: [],
      isUpdating: true,
      data: statePayload,
    });
  };

  const handleSearchTodos: t.SearchTodos = (searchTerm) => {
    const stateVisible = stateTodos.data.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStateTodos({
      ...stateTodos,
      visibilityFilter: t.FILTER_ALL,
      visibleTodos: stateVisible,
    });
  };

  const handleShowEdit: t.ShowEdit = (todo) => {
    const isAllreadyIncluded: boolean = stateTodos.editing.includes(todo);
    setStateTodos({
      ...stateTodos,
      editing: isAllreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const handleShowSearch: t.ShowSearch = () => {
    setStateTodos({
      ...stateTodos,
      isSearching: !stateTodos.isSearching,
      isUpdating: true,
    });
  };

  const handleToggleTodo: t.ToggleTodo = (todo) => {
    const statePayload = stateTodos.data.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
    );
    setStateTodos({
      ...stateTodos,
      countCompleted: statePayload.filter((_todo) => _todo.completed).length,
      isUpdating: true,
      data: statePayload,
    });
  };

  const handleToggleTodos: t.ToggleTodos = (isAllCompleted) => {
    const statePayload = stateTodos.data.map((_todo) =>
      _todo.completed === !isAllCompleted
        ? { ..._todo, completed: isAllCompleted }
        : _todo
    );
    setStateTodos({
      ...stateTodos,
      countCompleted: statePayload.filter((_todo) => _todo.completed).length,
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
      {stateTodos.editing.length !== 0 && (
        <EditComponent
          onEditTodo={handleEditTodo}
          onSaveTodo={handleSaveTodo}
          onShowEdit={handleShowEdit}
          todo={stateTodos.editing[0]}
        />
      )}
      <List>
        {stateTodos.isSearching ? (
          <SearchComponent
            onShowSearch={handleShowSearch}
            onSearchTodos={handleSearchTodos}
            visibleTodosLength={stateTodos.visibleTodos.length}
          />
        ) : (
          <>
            <AddComponent onAddTodo={addTodo} />
            <FilterComponent
              onRemoveTodos={handleRemoveTodos}
              onFilterTodos={handleFilterTodos}
              onShowSearch={handleShowSearch}
              onToggleTodos={handleToggleTodos}
              todos={stateTodos}
            />
          </>
        )}
        {stateTodos.visibleTodos.map((_todo) => (
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

export default Todos;
