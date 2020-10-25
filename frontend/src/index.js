import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
const history = createBrowserHistory();

ReactDOM.render(
  <Auth0Provider
    domain="dxpr.auth0.com"
    clientId="KVGMgLmt31eMTzfCJjsyATrlbxZmZOmk"
    redirectUri={window.location.origin}
  >
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);
