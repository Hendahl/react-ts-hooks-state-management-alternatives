import * as t from "../ts/types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";

const EditComponent: FC<{
  editTodo: t.EditTodo;
  saveTodo: t.SaveTodo;
  showEdit: t.ShowEdit;
  todo: t.TodoT;
}> = (props) => {
  const [stateTitle] = useState<string>(props.todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    props.editTodo({
      ...props.todo,
      title: e.target.value,
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      e.key === "Enter" &&
      props.todo.title !== "" &&
      props.todo.title !== stateTitle
    ) {
      props.saveTodo();
    }
  };

  const handleUndo = () => {
    props.editTodo({
      ...props.todo,
      title: stateTitle,
    });
  };

  return (
    <Dialog open={true} aria-labelledby="todo-dialog-title" fullWidth={true}>
      <DialogTitle id="todo-dialog-title">Edit : {stateTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>Change title of the todo ...</DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          fullWidth
          id="title"
          label="Title"
          margin="dense"
          onChange={handleChange}
          onKeyPress={handleEnter}
          value={props.todo.title}
        />
        <TextField
          disabled={true}
          fullWidth
          id="id"
          label="Id"
          margin="dense"
          value={props.todo.id}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={props.todo.title === stateTitle}
          onClick={handleUndo}
        >
          Reset
        </Button>
        <Button color="primary" onClick={() => props.showEdit(props.todo)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={props.todo.title === "" || props.todo.title === stateTitle}
          onClick={() => props.saveTodo()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditComponent;
