import * as t from "../ts/types";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "../theme";
import FormDialogComponent from "./form";
import EditIcon from "@material-ui/icons/Edit";

const TodoComponent: FC<{
  remove: t.Remove;
  todo: t.TodoT;
  toggle: t.Toggle;
}> = (props) => {
  const [showDialogState, setShowDialogState] = useState(false);
  const classes = useStyles();
  return (
    <>
      <ListItem role={undefined} button divider={true}>
        <ListItemIcon>
          <Switch
            checked={props.todo.isCompleted}
            color="primary"
            onChange={() => props.toggle(props.todo)}
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
            onClick={() => setShowDialogState(true)}
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
      <FormDialogComponent
        showDialogState={showDialogState}
        setShowDialogState={setShowDialogState}
        todo={props.todo}
      />
    </>
  );
};

export default TodoComponent;
