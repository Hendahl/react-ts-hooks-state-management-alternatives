import * as actions from "../../constants/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Context } from "../../context/store";
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  KeyboardEvent,
  useContext,
  useState,
} from "react";

const EditComponent: FC = (): ReactElement => {
  const { todos, dispatch } = useContext(Context);
  const todo = todos.editing[0];

  const [stateTitle] = useState<string>(todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const stateTodo = {
      ...todo,
      title: e.target.value,
    };
    dispatch({ type: actions.EDIT_TODO, todo: stateTodo });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && todo.title !== "" && todo.title !== stateTitle) {
      dispatch({ type: actions.SAVE_TODO });
    }
  };

  const handleUndo = () => {
    dispatch({ type: actions.EDIT_TODO, todo: todo });
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="stateTodo-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="stateTodo-dialog-title">Edit : {stateTitle}</DialogTitle>
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
        <Button
          color="primary"
          onClick={() => dispatch({ type: actions.SHOW_EDIT, todo: todo })}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={todo.title === "" || todo.title === stateTitle}
          onClick={() => dispatch({ type: actions.SAVE_TODO })}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditComponent;
