import * as serviceWorker from "./serviceWorker";
import App from "./containers/app";
import ReactDOM from "react-dom";
import React from "react"

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

serviceWorker.unregister();
