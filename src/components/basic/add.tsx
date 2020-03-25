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

interface AddProps {
  countAll: number;
  handleAdd: Add;
  handleAll: EditAll;
}

const Add: FC<AddProps> = ({
  countAll,
  handleAdd,
  handleAll
}: AddProps): ReactElement => {
  const [state, setState] = useState<AddState>({
    title: "",
    isAllCompleted: true
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const onEditAll = (): void => {
    setState({ ...state, isAllCompleted: !state.isAllCompleted });
    handleAll(state.isAllCompleted);
  };

  const onAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleAdd(state.title);
    setState({ ...state, title: "" });
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      handleAdd(state.title);
      setState({ ...state, title: "" });
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <IconButton
          aria-label="Toggle Completed"
          color={state.isAllCompleted ? "primary" : "inherit"}
          disabled={countAll === 0}
          edge="end"
          onClick={onEditAll}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </ListItemIcon>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        onChange={onChange}
        onKeyPress={onEnter}
        type="text"
        value={state.title}
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Add"
          disabled={state.title === ""}
          edge="end"
          onClick={onAdd}
        >
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Add;
