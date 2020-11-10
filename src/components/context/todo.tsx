import * as t from "../../ts/types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { Context } from "../../context/store";
import { useStyles } from "../../theme";

const TodoComponent: FC<{
  todo: t.Todo;
}> = ({ todo }) => {
  const { dispatch } = useContext(Context);
  const classes = useStyles();

  return (
    <ListItem role={undefined} button divider={true}>
      <ListItemIcon>
        <Switch
          checked={todo.completed}
          color="primary"
          value="completed"
          size="small"
          onChange={() => dispatch({ type: t.TOGGLE_TODO, todo: todo })}
        />
      </ListItemIcon>
      <ListItemText
        className={
          todo.completed ? classes.listItemTextCompleted : classes.listItemText
        }
        primary={todo.title}
        secondary={todo.id}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Delete Todo"
          onClick={() => dispatch({ type: t.DELETE_TODO, id: todo.id })}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => dispatch({ type: t.SHOW_EDIT, todo: todo })}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoComponent;
