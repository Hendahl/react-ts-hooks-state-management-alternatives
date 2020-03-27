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
  useState
} from "react";
import TextField from "@material-ui/core/TextField";
import { Context } from "../../context/store";

const Add: FC = (): ReactElement => {
  const [state, setState] = useState<AddState>({
    title: "",
    isAllCompleted: true
  });
  const { todos, dispatch } = useContext(Context);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const handleAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch({ type: actions.ADD_TODO, title: state.title });
    setState({ ...state, title: "" });
  };

  const handleAll = (): void => {
    setState({ ...state, isAllCompleted: !state.isAllCompleted });
    dispatch({
      type: actions.EDIT_TODOS,
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
          edge="end"
          aria-label="Add"
          disabled={state.title === ""}
          onClick={handleAdd}
        >
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Add;
