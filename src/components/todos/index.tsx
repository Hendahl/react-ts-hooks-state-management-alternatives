import * as utils from "../../utils";
import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "./progress";
import React, { FC, useEffect, useState } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import * as filter from "../../constants/filter";

const Todos: FC = () => {
  const [todos, setTodos] = useState<Todos>(utils.getStoredTodos());

  useEffect(() => {
    if (todos.isUpdating) {
      setTodos({
        ...todos,
        isUpdating: false,
        visible: todos.visibilityFilter === filter.ALL_TODOS
        ? todos.payload
        : todos.payload.filter(todo =>
          todos.visibilityFilter === filter.COMPLETED_TODOS
              ? todo.completed
              : !todo.completed
          )
      });
      utils.setStoredTodos(todos);
    }
  }, [todos]);

  const handleAdd: Add = title => {
    setTodos({
      ...todos,
      countAll: ++ todos.countAll,
      payload:[
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
      countAll: -- todos.countAll,
      payload:todos.payload.filter(_todo => _todo.id !== todo.id),
      isUpdating: true
    });
  };

  const handleDeleteAll: DeleteAll = () => {
    const defaultValues = utils.initialTodos
    utils.setStoredTodos({
      ...defaultValues
    });
    setTodos({
      ...defaultValues
    });
  };

  const handleEdit: Edit = todo => {
    const payloadState: Todo[] = [...todos.payload]
    setTodos({
      ...todos,
      countCompleted:payloadState.filter(_todo => _todo.completed).length,
      payload:todos.payload.map(_todo =>
        _todo.id === todo.id ? { ...todo, completed: !todo.completed } : _todo
      ),
      isUpdating: true
    });
  };

  const handleAll: EditAll = isAllCompleted => {
    const payloadState: Todo[] = [...todos.payload.map(todo =>
      todo.completed === !isAllCompleted
        ? { ...todo, completed: isAllCompleted }
        : todo
    )]
    setTodos({
      ...todos,
      countCompleted:payloadState.filter(_todo => _todo.completed).length,
      payload:payloadState,
      isUpdating: true
    });
  };

  const handleFilter: Filter = visibilityFilter => {
    setTodos({
      ...todos,
      visibilityFilter: visibilityFilter,
      isUpdating: true
    })
  };

  return (
    <>
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
        {todos.visible.map(todo => (
          <Todo
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={todo.id}
            todo={todo}
          />
        ))}
        <Filter
          todos={todos}
          handleDeleteAll={handleDeleteAll}
          handleFilter={handleFilter}
        />
      </List>
    </>
  );
};

export default Todos;
