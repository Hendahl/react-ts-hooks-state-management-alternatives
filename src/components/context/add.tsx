import * as actions from "../../constants/actions";
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
  useContext,
  useState,
  useEffect
} from "react";
import TextField from "@material-ui/core/TextField";
import { Context } from "../../context/store";

const Add: FC = (): ReactElement => {
  const { todos, dispatch } = useContext(Context);
  const [state, setState] = useState<AddState>({
    title: "",
    isAllCompleted: false
  });

  useEffect(() => {
    if (todos.payload[0]) {
      setState({ ...state, isAllCompleted: !todos.payload[0].completed });
    }
  }, [todos.payload]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const handleAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch({ type: actions.ADD_TODO, title: state.title });
    setState({ ...state, title: "" });
  };

  const handleToggleAll = (): void => {
    setState({ ...state, isAllCompleted: !state.isAllCompleted });
    dispatch({
      type: actions.TOGGLE_TODOS,
      isAllCompleted: state.isAllCompleted
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      dispatch({ type: actions.ADD_TODO, title: state.title });
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
          onClick={handleToggleAll}
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
