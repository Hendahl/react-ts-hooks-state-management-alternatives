import App from "../../components/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import orange from "@material-ui/core/colors/orange";
import React, { useMemo } from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme, useMediaQuery } from "@material-ui/core";

const AppContainer = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: orange[500]
          }
        },
        typography: {
          fontSize: 14
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
