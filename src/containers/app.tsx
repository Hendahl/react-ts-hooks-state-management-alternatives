import App from "../components/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import orange from "@material-ui/core/colors/orange";
import React, { FC, useMemo } from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { createMuiTheme, useMediaQuery } from "@material-ui/core";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface ThemeOptions {
    appDrawer?: {
      breakpoint?: Breakpoint;
    };
  }
}

const AppContainer: FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createMuiTheme({
        appDrawer: { breakpoint: "md" },
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: orange[500]
          }
        },
        typography: {
          fontSize: 12
        }
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};
export default AppContainer;
