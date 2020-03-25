import * as serviceWorker from "./serviceWorker";
import App from "./components/app";
import appTheme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Provider } from "./context/store";

const theme = appTheme({ appDrawer: { breakpoint: "md" } });

ReactDOM.render(
  <Provider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
