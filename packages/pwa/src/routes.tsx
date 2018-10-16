import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";

export const Routes = () => (
  <Router>
    <Route exact path="/" component={Dashboard} />
  </Router>
);
