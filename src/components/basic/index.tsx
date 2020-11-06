import * as types from "../../ts/types";
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

const Todos: FC = () => {
  const [stateTodos, setStateTodos] = useState<types.Todos>(
    utils.getStoredTodos()
  );

  useEffect(() => {
    if (stateTodos.isUpdating) {
      const stateUpdated: types.Todos = {
        ...stateTodos,
        isUpdating: false,
        visible:
          stateTodos.visibilityFilter === types.ALL_TODOS
            ? stateTodos.payload
            : stateTodos.payload.filter((_todo) =>
                stateTodos.visibilityFilter === types.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              ),
      };
      utils.setStoredTodos(stateUpdated);
      setStateTodos(stateUpdated);
    }
  }, [stateTodos]);

  const addTodo: types.AddTodo = (title) => {
    const statePayload = [
      { id: utils.uuid(), completed: false, title: title },
      ...stateTodos.payload,
    ];
    setStateTodos({
      ...stateTodos,
      countAll: stateTodos.countAll + 1,
      isUpdating: true,
      payload: statePayload,
      visibilityFilter: types.ALL_TODOS,
    });
  };

  const deleteTodo: types.DeleteTodo = (todo) => {
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

  const deleteTodos: types.DeleteTodos = () => {
    utils.setStoredTodos({
      ...types.initialTodos,
    });
    setStateTodos({
      ...types.initialTodos,
    });
  };

  const editTodo: types.EditTodo = (todo) => {
    const stateEditing = stateTodos.editing.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
    );
    setStateTodos({
      ...stateTodos,
      editing: stateEditing,
    });
  };

  const filterTodos: types.FilterTodos = (visibilityFilter) => {
    setStateTodos({
      ...stateTodos,
      isUpdating: true,
      visibilityFilter: visibilityFilter,
    });
  };

  const saveTodo: types.SaveTodo = () => {
    const stateTodo = stateTodos.editing[0];
    const statePayload: types.Todo[] = [
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

  const searchTodos: types.SearchTodos = (searchTerm) => {
    const stateVisible = stateTodos.payload.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStateTodos({
      ...stateTodos,
      visibilityFilter: types.ALL_TODOS,
      visible: stateVisible,
    });
  };

  const showEdit: types.ShowEdit = (todo) => {
    const isAllreadyIncluded: boolean = stateTodos.editing.includes(todo);
    setStateTodos({
      ...stateTodos,
      editing: isAllreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const showSearch: types.ShowSearch = () => {
    setStateTodos({
      ...stateTodos,
      isSearching: !stateTodos.isSearching,
      isUpdating: true,
    });
  };

  const toggleTodo: types.ToggleTodo = (todo) => {
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

  const toggleTodos: types.ToggleTodos = (isAllCompleted) => {
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
        {stateTodos.visible.map((_todo) => (
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
