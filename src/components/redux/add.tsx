import * as actions from "../../redux/todos/actions";
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
  useState,
  useEffect,
} from "react";
import TextField from "@material-ui/core/TextField";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface HeaderProps {
  todos: Todos;
}

const AddForm: FC = (): ReactElement => {
  const typedUseSelector: TypedUseSelectorHook<HeaderProps> = useSelector;
  const todos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [state, setState] = useState<AddState>({
    title: "",
    isAllCompleted: true,
  });

  useEffect(() => {
    if (todos.payload[0]) {
      setState((state) => ({
        ...state,
        isAllCompleted: !todos.payload[0].completed,
      }));
    }
  }, [todos.payload]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const handleAddTodo = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(actions.addTodo(state.title));
    setState({ ...state, title: "" });
  };

  const handleChangeTodosCompleted = (): void => {
    setState({ ...state, isAllCompleted: !state.isAllCompleted });
    dispatch(actions.editTodos(state.isAllCompleted));
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      dispatch(actions.addTodo(state.title));
      setState({ ...state, title: "" });
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <IconButton
          aria-label="Edit Completed"
          color={state.isAllCompleted ? "primary" : "inherit"}
          disabled={todos.countAll === 0}
          edge="end"
          onClick={handleChangeTodosCompleted}
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
          onClick={handleAddTodo}
        >
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default AddForm;
