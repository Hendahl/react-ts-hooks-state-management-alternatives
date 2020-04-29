import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  KeyboardEvent,
  useState,
} from "react";

interface EditFormProps {
  onEditTodo: (todo: Todo) => void;
  onSaveTodo: () => void;
  onShowEdit: (todo: Todo) => void;
  todo: Todo;
}

const EditComponent: FC<EditFormProps> = ({
  onEditTodo,
  onSaveTodo,
  onShowEdit,
  todo,
}): ReactElement => {
  const [stateTitle] = useState<string>(todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onEditTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && todo.title !== "" && todo.title !== stateTitle) {
      onSaveTodo();
    }
  };

  const handleUndo = () => {
    onEditTodo({
      ...todo,
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
          Reset
        </Button>
        <Button color="primary" onClick={() => onShowEdit(todo)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={todo.title === "" || todo.title === stateTitle}
          onClick={() => onSaveTodo()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditComponent;
