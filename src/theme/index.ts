import orange from "@material-ui/core/colors/orange";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { createMuiTheme } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
        main: orange[500],
      },
    },
    typography: {
      fontSize: 12,
    },
  });

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    buttonGroup: {
      margin: "0 auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: "4rem",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    listItem: {
      color: orange[500],
    },
    listItemText: {
      textDecoration: "inherit",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    listItemTextCompleted: {
      textDecoration: "line-through",
    },
    toolbar: theme.mixins.toolbar,
    root: {
      display: "flex",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "100%",
    },
    label: {
      marginTop: "1rem",
    },
  })
);
