import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
