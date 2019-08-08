import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import Login from "../../components/Login";
import Dashboard from "../../components/Dashboard";
import StarList from "../../components/Stars/List";
import MovieList from "../../components/Movies/List";
import NewsList from "../../components/News/List";
import PostList from "../../components/Posts/List";
import ActivityList from "../../components/Activity/List";
import { history } from "../../helpers/history";
import PrivateRoute from "../../helpers/privateRoute";
import ErrorBoundary from "../Utilities/ErrorBoundary";

class RouterApp extends Component {
  render() {
    return (
      <Router history={history}>
        <ErrorBoundary>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/web/stars/:type?" component={StarList} />
          <PrivateRoute path="/web/movies/:type?" component={MovieList} />
          <PrivateRoute path="/web/news/:type?" component={NewsList} />
          <PrivateRoute path="/web/post/:type?" component={PostList} />
          <PrivateRoute path="/web/activity" component={ActivityList} />
          <Route exact path="/login" component={Login} />
        </ErrorBoundary>
      </Router>
    );
  }
}

export default RouterApp;
