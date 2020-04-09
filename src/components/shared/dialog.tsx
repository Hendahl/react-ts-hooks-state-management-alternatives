import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface TodoDialogProps {
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  todo: Todo;
  handleChangeTodoTitle: (todo: Todo) => void;
}

const TodoDialog: FC<TodoDialogProps> = ({
  handleChangeTodoTitle,
  setIsDialogOpen,
  todo,
}) => {
  const handleEditDialog = () => {
    handleChangeTodoTitle({
      ...todo,
      completed: todo.completed,
      title: "TEST",
    });
  };
  return (
    <Dialog open={true} aria-labelledby="todo-dialog-title">
      <DialogTitle id="todo-dialog-title">Edit </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setIsDialogOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleEditDialog}>
          SaveTodo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoDialog;
