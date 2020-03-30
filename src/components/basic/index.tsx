import * as utils from "../../utils";
import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect, useState } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import * as filter from "../../constants/filter";
import Container from "@material-ui/core/Container";

interface TodosProps {
  handleDelete: Delete;
  handleEdit: Edit;
  todo: Todo;
  todos: Todos;
}

const Todos: FC<TodosProps> = () => {
  const [todos, setTodos] = useState<Todos>(utils.getStoredTodos());

  useEffect(() => {
    if (todos.isUpdating) {
      const payloadState: Todo[] = [...todos.payload];
      setTodos({
        ...todos,
        countCompleted: payloadState.filter(_todo => _todo.completed).length,
        isUpdating: false,
        visible:
          todos.visibilityFilter === filter.ALL_TODOS
            ? payloadState
            : payloadState.filter(_todo =>
                todos.visibilityFilter === filter.COMPLETED_TODOS
                  ? _todo.completed
                  : !_todo.completed
              )
      });
      utils.setStoredTodos(todos);
    }
  }, [todos]);

  const handleAdd: Add = title => {
    setTodos({
      ...todos,
      countAll: todos.countAll + 1,
      payload: [
        { id: utils.uuid(), completed: false, title: title },
        ...todos.payload
      ],
      isUpdating: true,
      visibilityFilter: filter.ALL_TODOS
    });
  };

  const handleDelete: Delete = todo => {
    setTodos({
      ...todos,
      countAll: todos.countAll - 1,
      payload: todos.payload.filter(_todo => _todo.id !== todo.id),
      isUpdating: true
    });
  };

  const handleDeleteAll: DeleteAll = () => {
    const defaultValues = utils.initialTodos;
    utils.setStoredTodos({
      ...defaultValues
    });
    setTodos({
      ...defaultValues
    });
  };

  const handleEdit: Edit = todo => {
    const payloadState: Todo[] = [...todos.payload];
    setTodos({
      ...todos,
      payload: payloadState.map(_todo =>
        _todo.id === todo.id ? { ...todo, completed: !todo.completed } : _todo
      ),
      isUpdating: true
    });
  };

  const handleAll: EditAll = isAllCompleted => {
    const payloadState: Todo[] = [
      ...todos.payload.map(todo =>
        todo.completed === !isAllCompleted
          ? { ...todo, completed: isAllCompleted }
          : todo
      )
    ];
    setTodos({
      ...todos,
      payload: payloadState,
      isUpdating: true
    });
  };

  const handleFilter: Filter = visibilityFilter => {
    setTodos({
      ...todos,
      visibilityFilter: visibilityFilter,
      isUpdating: true
    });
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Basic
        </Box>
      </Typography>
      <Progress isUpdating={todos.isUpdating} />
      <List>
        <Add
          countAll={todos.countAll}
          handleAdd={handleAdd}
          handleAll={handleAll}
        />
        {todos.visible.map(_todo => (
          <Todo
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={_todo.id}
            todo={_todo}
          />
        ))}
        <Filter
          handleDeleteAll={handleDeleteAll}
          handleFilter={handleFilter}
          todos={todos}
        />
      </List>
    </Container>
  );
};

export default Todos;
