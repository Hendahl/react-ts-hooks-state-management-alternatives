import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import React, { FC, useState, ChangeEvent } from "react";
//import * as t from "../ts/types";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStyles } from "../theme";

const TodoFormComponent: FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  let history = useHistory();
  const [dataState, setDataState] = useState({
    id: id,
    isCompleted: false,
    title: "title",
  });
  const classes = useStyles();

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setDataState({ ...dataState, [e.target.id]: e.target.value });
  };

  const handleChangeBoolean = (e: ChangeEvent<HTMLInputElement>): void => {
    setDataState({ ...dataState, [e.target.id]: e.target.checked });
  };

  const handleSubmit = (): void => {
    console.log(dataState);
    history.goBack();
  };

  return (
    <div>
      <Dialog open={true} fullWidth={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Todo: {dataState.id}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.form}>
            <FormGroup>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                fullWidth
                value={dataState.title}
                onChange={handleChangeText}
              />
              <FormControlLabel
                className={classes.label}
                control={
                  <Switch
                    color="primary"
                    size="small"
                    id="isCompleted"
                    checked={dataState.isCompleted}
                    onChange={handleChangeBoolean}
                    value={dataState.isCompleted}
                  />
                }
                label="Done"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TodoFormComponent;
