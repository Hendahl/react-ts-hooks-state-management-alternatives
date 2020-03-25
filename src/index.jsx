import * as serviceWorker from "./serviceWorker";
import App from "./components/app";
import appTheme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const theme = appTheme({ appDrawer: { breakpoint: "md" } });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
