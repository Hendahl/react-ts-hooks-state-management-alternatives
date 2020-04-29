import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";

const EditComponent: FC = observer(() => {
  const { todos } = useStore();
  const todo = todos.editing[0];
  const [stateTitle] = useState<string>(todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    todos.editTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && todo.title !== "" && todo.title !== stateTitle) {
      todos.saveTodo();
    }
  };

  const handleUndo = () => {
    todos.editTodo({
      ...todo,
      title: stateTitle,
    });
  };

  return (
    <Dialog
      open={true}
      aria-labelledby=" toggleTodo-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id=" toggleTodo-dialog-title">Edit {stateTitle}</DialogTitle>
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
          value={todo.title}
        />
        <TextField
          disabled={true}
          fullWidth
          id="id"
          label="Id"
          margin="dense"
          value={todo.id}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={todo.title === stateTitle}
          onClick={handleUndo}
        >
          Undo
        </Button>
        <Button color="primary" onClick={() => todos.showEdit(todo)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={todo.title === "" || todo.title === stateTitle}
          onClick={() => todos.saveTodo()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EditComponent;
