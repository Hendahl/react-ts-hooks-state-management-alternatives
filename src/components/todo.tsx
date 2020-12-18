import { useHistory } from "react-router-dom";
import { useStyles } from "../theme";
import * as t from "../ts/types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";
import Switch from "@material-ui/core/Switch";

const TodoComponent: FC<{
  remove: t.Remove;
  todo: t.TodoT;
  toggle: t.Toggle;
}> = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleToggle = () => {
    const toggledTodo = { ...props.todo, isCompleted: !props.todo.isCompleted };
    props.toggle(toggledTodo);
  };
  return (
    <>
      <ListItem role={undefined} button divider={true}>
        <ListItemIcon>
          <Switch
            checked={props.todo.isCompleted}
            color="primary"
            onChange={handleToggle}
            value="isCompleted"
            size="small"
          />
        </ListItemIcon>
        <ListItemText
          className={
            props.todo.isCompleted
              ? classes.listItemTextCompleted
              : classes.listItemText
          }
          primary={props.todo.title}
          secondary={props.todo.id}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => history.push(`/todo/${props.todo.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="remove"
            onClick={() => props.remove(props.todo)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default TodoComponent;
