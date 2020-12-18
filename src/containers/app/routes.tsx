import Home from "../home";
import NotFound from "../notfound";
import React, { FC } from "react";
import TodosBasic from "../basic";
import TodosContext from "../context";
import TodosMobx from "../mobx";
import TodosPullstate from "../pullstate";
import TodosRedux from "../redux";
import TodosReduxToolkit from "../reduxtoolkit";
import { Route, Switch } from "react-router-dom";
import TodoFormComponent from "../../components/todoForm";

const AppRoutes: FC = () => {
  return (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={TodosBasic} exact path="/basic" />
      <Route component={TodosContext} exact path="/context" />
      <Route component={TodosRedux} exact path="/redux" />
      <Route component={TodosReduxToolkit} exact path="/reduxtoolkit" />
      <Route component={TodosMobx} exact path="/mobx" />
      <Route component={TodosPullstate} exact path="/pullstate" />
      <Route path="/todo/:id" exact children={<TodoFormComponent />} />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};
export default AppRoutes;
