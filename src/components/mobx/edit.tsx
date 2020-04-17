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

const EditForm: FC = observer(() => {
  const { todos } = useStore();
  const editTodo = todos.editing[0];
  const [existingTitle] = useState<string>(editTodo.title);

  const handleChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    todos.changeTodoTitle({
      ...editTodo,
      title: e.target.value,
    });
  };

  const handleUndo: UndoEdit = () => {
    todos.changeTodoTitle({
      ...editTodo,
      title: existingTitle,
    });
  };

  const handleSaveTodoTitleOnEnter = (
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      e.key === "Enter" &&
      editTodo.title !== "" &&
      editTodo.title !== existingTitle
    ) {
      todos.saveTodoTitle();
    }
  };

  return (
    <Dialog
      open={true}
      aria-labelledby=" changeTodoCompleted-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id=" changeTodoCompleted-dialog-title">
        Edit {existingTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Change title of the todo ...</DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={editTodo.title}
          onChange={handleChangeTodoTitle}
          onKeyPress={handleSaveTodoTitleOnEnter}
        />
        <TextField
          disabled={true}
          margin="dense"
          id="id"
          label="Id"
          fullWidth
          value={editTodo.id}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleUndo}
          disabled={editTodo.title === existingTitle}
        >
          Undo
        </Button>
        <Button color="primary" onClick={() => todos.editingTodo(editTodo)}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => todos.saveTodoTitle()}
          disabled={editTodo.title === "" || editTodo.title === existingTitle}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EditForm;
