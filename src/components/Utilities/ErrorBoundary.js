import React, { Component } from "react";
import Error from "../Pages/Error";

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Error>
          <h2 className="text-danger">Something went wrong</h2>
          <p>
            Return to the <a href="/">Home Page</a>
          </p>
        </Error>
      );
    }
    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
