import * as t from "../../ts/types";
import * as utils from "../../utils";
import AddComponent from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "./edit";
import FilterComponent from "./filter";
import List from "@material-ui/core/List";
import ProgressComponent from "./progress";
import React, { FC, useEffect, useState } from "react";
import SearchComponent from "./search";
import TodoComponent from "./todo";
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
        visible:
          stateTodos.visibilityFilter === t.ALL_TODOS
            ? stateTodos.payload
            : stateTodos.payload.filter((_todo) =>
                stateTodos.visibilityFilter === t.COMPLETED_TODOS
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
      ...stateTodos.payload,
    ];
    setStateTodos({
      ...stateTodos,
      countAll: stateTodos.countAll + 1,
      isUpdating: true,
      payload: statePayload,
      visibilityFilter: t.ALL_TODOS,
    });
  };

  const deleteTodo: t.DeleteTodo = (todo) => {
    const statePayload = stateTodos.payload.filter(
      (_todo) => _todo.id !== todo.id
    );
    setStateTodos({
      ...stateTodos,
      countAll: --stateTodos.countAll,
      countCompleted: statePayload.length,
      isUpdating: true,
      payload: statePayload.filter((_todo) => _todo.id !== todo.id),
    });
  };

  const deleteTodos: t.DeleteTodos = () => {
    setTodosApi({
      ...t.initialTodos,
    });
    setStateTodos({
      ...t.initialTodos,
    });
  };

  const editTodo: t.EditTodo = (todo) => {
    const stateEditing = stateTodos.editing.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
    );
    setStateTodos({
      ...stateTodos,
      editing: stateEditing,
    });
  };

  const filterTodos: t.FilterTodos = (visibilityFilter) => {
    setStateTodos({
      ...stateTodos,
      isUpdating: true,
      visibilityFilter: visibilityFilter,
    });
  };

  const saveTodo: t.SaveTodo = () => {
    const stateTodo = stateTodos.editing[0];
    const statePayload: t.Todo[] = [
      ...stateTodos.payload.map((_todo) =>
        _todo.id === stateTodo.id ? { ..._todo, title: stateTodo.title } : _todo
      ),
    ];
    setStateTodos({
      ...stateTodos,
      editing: [],
      isUpdating: true,
      payload: statePayload,
    });
  };

  const searchTodos: t.SearchTodos = (searchTerm) => {
    const stateVisible = stateTodos.payload.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStateTodos({
      ...stateTodos,
      visibilityFilter: t.ALL_TODOS,
      visible: stateVisible,
    });
  };

  const showEdit: t.ShowEdit = (todo) => {
    const isAllreadyIncluded: boolean = stateTodos.editing.includes(todo);
    setStateTodos({
      ...stateTodos,
      editing: isAllreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const showSearch: t.ShowSearch = () => {
    setStateTodos({
      ...stateTodos,
      isSearching: !stateTodos.isSearching,
      isUpdating: true,
    });
  };

  const toggleTodo: t.ToggleTodo = (todo) => {
    const statePayload = stateTodos.payload.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo
    );
    setStateTodos({
      ...stateTodos,
      countCompleted: statePayload.filter((_todo) => _todo.completed).length,
      isUpdating: true,
      payload: statePayload,
    });
  };

  const toggleTodos: t.ToggleTodos = (isAllCompleted) => {
    const statePayload = stateTodos.payload.map((_todo) =>
      _todo.completed === !isAllCompleted
        ? { ..._todo, completed: isAllCompleted }
        : _todo
    );
    setStateTodos({
      ...stateTodos,
      countCompleted: statePayload.filter((_todo) => _todo.completed).length,
      payload: statePayload,
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
          onEditTodo={editTodo}
          onSaveTodo={saveTodo}
          onShowEdit={showEdit}
          todo={stateTodos.editing[0]}
        />
      )}
      <List>
        {stateTodos.isSearching ? (
          <SearchComponent
            onShowSearch={showSearch}
            onSearchTodos={searchTodos}
            todos={stateTodos}
          />
        ) : (
          <>
            <AddComponent onAddTodo={addTodo} />
            <FilterComponent
              onDeleteTodos={deleteTodos}
              onFilterTodos={filterTodos}
              onShowSearch={showSearch}
              onToggleTodos={toggleTodos}
              todos={stateTodos}
            />
          </>
        )}
        {stateTodos.payload.map((_todo) => (
          <TodoComponent
            key={_todo.id}
            onDeleteTodo={deleteTodo}
            onShowEdit={showEdit}
            onToggleTodo={toggleTodo}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
