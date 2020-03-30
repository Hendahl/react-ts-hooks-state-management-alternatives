import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStyles } from "../../theme";
import { withRouter } from "react-router-dom";
import CodeIcon from "@material-ui/icons/Code";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";

const AppMenu: FC = () => {
  const classes = useStyles();
  const currentPath = useLocation().pathname;

  return (
    <>
      <List>
        <ListItem
          className={classes.listItem}
          component={Link}
          selected={currentPath === "/" ? true : false}
          to="/"
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Home" />
        </ListItem>
        <ListItem
          className={classes.listItem}
          component={Link}
          selected={currentPath === "/context" ? true : false}
          to="/context"
        >
          <ListItemIcon>
            <CodeIcon color="primary" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Todos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          className={classes.listItem}
          button
          component="a"
          href="https://github.com/Hendahl/react-ts-hooks-state-management-alternatives.git"
        >
          <ListItemIcon>
            <GitHubIcon color="primary" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="GitHub" />
        </ListItem>
      </List>
    </>
  );
};
export default withRouter(AppMenu);
