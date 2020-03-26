import * as serviceWorker from "./serviceWorker";
import App from "./containers/app";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "./context/store";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
