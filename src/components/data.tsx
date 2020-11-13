import * as t from "../ts/types";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useState } from "react";
import StorageIcon from "@material-ui/icons/Storage";
import Typography from "@material-ui/core/Typography";

const DataComponent: FC<{ todos: t.TodosT }> = (props) => {
  const [showDataState, setShowDataState] = useState(false);

  const handleShowData = () => {
    setShowDataState(!showDataState);
  };

  return (
    <>
      {props.todos.countAll !== 0 && (
        <>
          <ListItem>
            <IconButton
              color="primary"
              edge="end"
              aria-label="Show Data"
              onClick={handleShowData}
            >
              <StorageIcon />
            </IconButton>
          </ListItem>
          <Collapse in={showDataState} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button divider={true}>
                <ListItemText>
                  <pre>
                    <Typography component="p">
                      {JSON.stringify(props.todos, null, 4)}
                    </Typography>
                  </pre>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};

export default DataComponent;
