import * as filter from "../../constants/filter";
import * as utils from "../../utils";
import AddForm from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "./progress";
import React, { FC, useEffect, useState } from "react";
import SearchForm from "./search";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";

/*
todos state structure  
{
  countAll: 0,
  countCompleted: 0,
  editing: [],
  isSearching: false,
  isUpdating: false,
  payload: [],
  visibilityFilter: filter.ALL_TODOS,
  visible: [],
}
*/

type AddTodo = (title: string) => void;
type DeleteTodo = (todo: Todo) => void;
type DeleteTodos = () => void;
type EditTodo = (todo: Todo) => void;
type FilterTodos = (visibiltityFilter: string) => void;
type SaveTodo = () => void;
type SearchTodos = (searchTerm: string) => void;
type ShowEdit = (todo: Todo) => void;
type ShowShearch = () => void;
type ToggleTodo = (todo: Todo) => void;
type ToggleTodos = (isAllCompleted: boolean) => void;

interface TodosProps {
  stateTodos: Todos;
  todo: Todo;
}

const Todos: FC<TodosProps> = () => {
  const [stateTodos, setStateTodos] = useState<Todos>(utils.getStoredTodos());

  useEffect(() => {
    if (stateTodos.isUpdating) {
      setStateTodos(utils.updateTodos(stateTodos));
    }
  }, [stateTodos]);

  const addTodo: AddTodo = (title) => {
    const statePayload = [
      { id: utils.uuid(), completed: false, title: title },
      ...stateTodos.payload,
    ];
    setStateTodos({
      ...stateTodos,
      countAll: stateTodos.countAll + 1,
      isUpdating: true,
      payload: statePayload,
      visibilityFilter: filter.ALL_TODOS,
    });
  };

  const deleteTodo: DeleteTodo = (todo) => {
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

  const deleteTodos: DeleteTodos = () => {
    utils.setStoredTodos({
      ...utils.initialTodos,
    });
    setStateTodos({
      ...utils.initialTodos,
    });
  };

  const editTodo: EditTodo = (todo) => {
    const stateEditing = stateTodos.editing.map((_todo) =>
      _todo.id === todo.id ? { ..._todo, title: todo.title } : _todo
    );
    setStateTodos({
      ...stateTodos,
      editing: stateEditing,
    });
  };

  const filterTodos: FilterTodos = (visibilityFilter) => {
    setStateTodos({
      ...stateTodos,
      isUpdating: true,
      visibilityFilter: visibilityFilter,
    });
  };

  const saveTodo: SaveTodo = () => {
    const stateTodo = stateTodos.editing[0];
    const statePayload: Todo[] = [
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

  const searchTodos: SearchTodos = (searchTerm) => {
    const stateVisible = stateTodos.payload.filter((_todo) =>
      _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStateTodos({
      ...stateTodos,
      visibilityFilter: filter.ALL_TODOS,
      visible: stateVisible,
    });
  };

  const showEdit: ShowEdit = (todo) => {
    const isAllreadyIncluded: boolean = stateTodos.editing.includes(todo);
    setStateTodos({
      ...stateTodos,
      editing: isAllreadyIncluded ? [] : [todo],
      isUpdating: true,
    });
  };

  const showSearch: ShowShearch = () => {
    setStateTodos({
      ...stateTodos,
      isSearching: !stateTodos.isSearching,
      isUpdating: true,
    });
  };

  const toggleTodo: ToggleTodo = (todo) => {
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

  const toggleTodos: ToggleTodos = (isAllCompleted) => {
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
      <Progress isUpdating={stateTodos.isUpdating} />
      {stateTodos.editing.length !== 0 && (
        <EditForm
          onEditTodo={editTodo}
          onSaveTodo={saveTodo}
          onShowEdit={showEdit}
          todo={stateTodos.editing[0]}
        />
      )}
      <List>
        {stateTodos.isSearching ? (
          <SearchForm
            onShowSearch={showSearch}
            onSearchTodos={searchTodos}
            todos={stateTodos}
          />
        ) : (
          <>
            <AddForm onAddTodo={addTodo} />
            <FilterTodos
              onDeleteTodos={deleteTodos}
              onFilterTodos={filterTodos}
              onShowSearch={showSearch}
              onToggleTodos={toggleTodos}
              todos={stateTodos}
            />
          </>
        )}
        {stateTodos.visible.map((_todo) => (
          <Todo
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
