import * as actions from "../../redux/todos/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  KeyboardEvent,
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as t from "../../ts/types";
import { edit, save, showEdit } from "../../reduxtoolkit/todos";
import { RootState } from "../../reduxtoolkit/rootReducer";

type Undo = () => void;

interface EditI {
  todos: t.Todos;
}

const EditComponent: FC = (): ReactElement => {
  const { editing } = useSelector((state: RootState) => state.todos);
  const todo = editing[0];
  const dispatch = useDispatch();
  const [stateTitle] = useState<string>(todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const stateTodo = {
      ...todo,
      title: e.target.value,
    };
    dispatch(edit(stateTodo));
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && todo.title !== "" && todo.title !== stateTitle) {
      dispatch(save());
    }
  };

  const handleUndo: Undo = () => {
    const stateTodo = {
      ...todo,
      title: stateTitle,
    };
    dispatch(edit(stateTodo));
  };

  return (
    <Dialog open={true} aria-labelledby="todo-dialog-title" fullWidth={true}>
      <DialogTitle id="todo-dialog-title">Edit : {stateTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>Change title of the todo ...</DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={todo.title}
          onChange={handleChange}
          onKeyPress={handleEnter}
        />
        <TextField
          disabled={true}
          margin="dense"
          id="id"
          label="Id"
          fullWidth
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
        <Button color="primary" onClick={() => dispatch(showEdit(todo))}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={todo.title === "" || todo.title === stateTitle}
          onClick={() => dispatch(save())}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditComponent;
