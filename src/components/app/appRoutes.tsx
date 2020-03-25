import { Route, Switch } from "react-router-dom";
import Home from "../home";
import NotFound from "../notfound";
import React, { FC } from "react";
import TodosBasic from "../todos";

const AppRoutes: FC = () => {
  return (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={TodosBasic} exact path="/basic" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};
export default AppRoutes;
