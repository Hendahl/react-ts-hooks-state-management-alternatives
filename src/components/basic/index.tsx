import * as utils from "../../utils";
import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect, useState } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";

const Todos: FC = () => {
  const [todos, setTodos] = useState<Todos>(utils.getStoredTodos());

  useEffect(() => {
    if (todos.isUpdating) {
      setTodos(utils.updateTodos(todos));
    }
  }, [todos]);

  const handleAdd: Add = title => {
    setTodos(utils.addTodo(todos, title));
  };

  const handleDelete: Delete = todo => {
    setTodos(utils.deleteTodo(todos, todo.id));
  };

  const handleDeleteAll: DeleteAll = () => {
    setTodos(utils.deleteTodos());
  };

  const handleEdit: Edit = todo => {
    setTodos(utils.editTodo(todos, todo.id));
  };

  const handleAll: EditAll = completed => {
    setTodos(utils.editTodos(todos, completed));
  };

  const handleFilter: Filter = visibilityFilter => {
    setTodos(utils.setFilter(todos, visibilityFilter));
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
        {todos.visible.map(_todo => (
          <Todo
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={_todo.id}
            todo={_todo}
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
