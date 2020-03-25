import { Route, Switch } from "react-router-dom";
import Home from "../home";
import NotFound from "../notfound";
import React, { FC } from "react";
import TodosContext from "../../containers";

const AppRoutes: FC = () => {
  return (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={TodosContext} exact path="/context" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};
export default AppRoutes;
