import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import Login from "../../components/Login";
import Dashboard from "../../components/Dashboard";
import CreateGarage from "../../components/CreateGarage";
import { history } from "../../helpers/history";
import PrivateRoute from "../../helpers/privateRoute";
import ErrorBoundary from "../Utilities/ErrorBoundary";

class RouterApp extends Component {
  render() {
    return (
      <Router history={history}>
        <ErrorBoundary>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/create-garage" component={CreateGarage} />
          <Route exact path="/login" component={Login} />
        </ErrorBoundary>
      </Router>
    );
  }
}

export default RouterApp;
