import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { createMuiTheme } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface ThemeOptions {
    appDrawer?: {
      breakpoint?: Breakpoint;
    };
  }
}

export const themeOverrides = (darkMode: boolean) =>
  createMuiTheme({
    appDrawer: { breakpoint: "md" },
    palette: {
      type: darkMode ? "light" : "dark",
      primary: {
        main: orange[500]
      }
    },
    typography: {
      fontSize: 12
    }
  });

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: "4rem"
    },
    listItem: {
      color: "white"
    },
    listItemText: {
      textDecoration: "inherit"
    },
    listItemTextCompleted: {
      textDecoration: "line-through",
      color: grey[300]
    },
    buttonGroup: {
      margin: "0 auto"
    }
  })
);
