import { useStyles } from "../theme";
import * as t from "../ts/types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useState, ChangeEvent, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";

const TodoComponent: FC<{
  remove: t.Remove;
  todo: t.TodoT;
  save: t.Save;
}> = (props) => {
  const classes = useStyles();
  const initialState = {
    id: props.todo.id,
    isCompleted: props.todo.isCompleted,
    title: props.todo.title,
  };
  const [stateIsEditing, setStateIsEditing] = useState(false);
  const [stateData, setStateData] = useState(initialState);

  useEffect(() => {
    if (props.todo.isCompleted !== stateData.isCompleted && !stateIsEditing) {
      setStateData({ ...stateData, isCompleted: props.todo.isCompleted });
    }
  }, [stateData, stateIsEditing, props.todo]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setStateData({ ...stateData, [e.target.id]: e.target.value });
  };

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>): void => {
    setStateData({ ...stateData, [e.target.id]: e.target.checked });
  };

  const handleSave = () => {
    props.save(stateData);
    setStateIsEditing(false);
  };

  const handleCancel = () => {
    setStateData(initialState);
    setStateIsEditing(false);
  };

  return (
    <>
      <ListItem role={undefined} button divider={true}>
        {stateIsEditing ? (
          <>
            <ListItemIcon>
              <Switch
                checked={stateData.isCompleted}
                disabled={!stateIsEditing}
                color="primary"
                onChange={handleChangeChecked}
                size="small"
                id="isCompleted"
                value={stateData.isCompleted}
              />
            </ListItemIcon>
            <TextField
              autoFocus
              id="title"
              label="Title"
              margin="dense"
              onChange={handleChangeValue}
              value={stateData.title}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="save" onClick={handleSave}>
                <SaveIcon />
              </IconButton>
              <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        ) : (
          <>
            <ListItemIcon>
              <Switch
                checked={props.todo.isCompleted}
                disabled={!stateIsEditing}
                color="primary"
                size="small"
                id="isCompleted"
                value={props.todo.isCompleted}
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
                onClick={() => setStateIsEditing(true)}
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
          </>
        )}
      </ListItem>
    </>
  );
};

export default TodoComponent;
