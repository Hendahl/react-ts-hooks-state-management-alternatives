import * as serviceWorker from "./serviceWorker";
import App from "./containers/app";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
