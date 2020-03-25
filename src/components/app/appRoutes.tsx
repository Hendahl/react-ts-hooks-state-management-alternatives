import { Route, Switch } from "react-router-dom";
import Home from "../home";
import NotFound from "../notfound";
import React, { FC } from "react";
import TodosBasic from "../basic";
import TodosContext from "../../containers/context";
import TodosMobx from "../../containers/mobx";
import TodosRedux from "../../containers/redux";

const AppRoutes: FC = () => {
  return (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={TodosBasic} exact path="/basic" />
      <Route component={TodosContext} exact path="/context" />
      <Route component={TodosRedux} exact path="/redux" />
      <Route component={TodosMobx} exact path="/mobx" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};
export default AppRoutes;
