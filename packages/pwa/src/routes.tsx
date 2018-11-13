import * as React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import Dashboard from "./containers/Dashboard";
import Search from "./containers/Search";
import RepositorySelector from "./containers/RepositorySelector";
import DirectorySelector from "./containers/DirectorySelector";
import LanguageSelector from "./containers/LanguageSelector";

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Dashboard} />

      {/* FIXME: Move to sub route */}
      <Route path="/search/repositories" component={RepositorySelector} />
      <Route
        path="/search/directories/:owner/:repo/:paths*"
        component={DirectorySelector}
      />
      <Route path="/search/languages" component={LanguageSelector} />

      <Route path="/search" component={Search} />
    </Switch>
  </Router>
);
