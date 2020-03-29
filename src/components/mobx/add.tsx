import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  ReactElement,
  useState
} from "react";
import TextField from "@material-ui/core/TextField";
import { useStore } from "../../mobx/store";

const Add: FC = (): ReactElement => {
  const { todos } = useStore();
  const [state, setState] = useState<AddState>({
    title: "",
    isAllCompleted: true
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const handleAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    todos.addTodo(state.title);
    setState({ ...state, title: "" });
  };

  const handleAll = (): void => {
    setState({ ...state, isAllCompleted: !state.isAllCompleted });
    todos.editTodos(state.isAllCompleted);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      todos.addTodo(state.title);
      setState({ ...state, title: "" });
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <IconButton
          aria-label="Toggle Completed"
          color={state.isAllCompleted ? "primary" : "inherit"}
          disabled={todos.countAll === 0}
          edge="end"
          onClick={handleAll}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </ListItemIcon>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        onChange={handleChange}
        onKeyPress={handleEnter}
        type="text"
        value={state.title}
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Add"
          color="primary"
          disabled={state.title === ""}
          edge="end"
          onClick={handleAdd}
        >
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Add;
