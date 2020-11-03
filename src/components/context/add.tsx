import * as types from "../../ts/types";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { Context } from "../../context/store";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactElement,
  useContext,
  useState,
} from "react";

const AddComponent: FC = (): ReactElement => {
  const { dispatch } = useContext(Context);
  const [stateTitle, setStateTitle] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStateTitle(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && stateTitle !== "") {
      dispatch({ type: types.ADD_TODO, title: stateTitle });
      setStateTitle("");
    }
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        onChange={handleChange}
        onKeyPress={handleEnter}
        type="text"
        value={stateTitle}
        variant="outlined"
      />
    </ListItem>
  );
};

export default AddComponent;
