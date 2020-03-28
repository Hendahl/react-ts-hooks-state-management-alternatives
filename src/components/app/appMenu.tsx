import CodeIcon from "@material-ui/icons/Code";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStyles } from "../../theme";
import { withRouter } from "react-router-dom";

const AppMenu: FC = () => {
  const currentPath = useLocation().pathname;
  const classes = useStyles();

  return (
    <>
      <List>
        <ListItem
          className={classes.listItem}
          color="primary"
          component={Link}
          selected={currentPath === "/" ? true : false}
          to="/"
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          className={classes.listItem}
          component={Link}
          selected={currentPath === "/basic" ? true : false}
          to="/basic"
        >
          <ListItemIcon>
            <CodeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Todos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          className={classes.listItem}
          component="a"
          href="https://github.com/Hendahl/react-ts-hooks-state-management-alternatives.git"
        >
          <ListItemIcon>
            <GitHubIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItem>
      </List>
    </>
  );
};
export default withRouter(AppMenu);
