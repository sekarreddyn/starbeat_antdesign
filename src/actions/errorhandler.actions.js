import { errorhandlerConstants } from "../constants";
import { history } from "../helpers";
import { authActions } from "../actions";
export const errorHandlerActions = {
  handleHTTPError
};

function handleHTTPError(error) {
  if (error) {
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        return execute400Handler(error);
      } else if (status === 401) {
        return execute401Handler(error);
      } else if (status === 403) {
        return execute403Handler(error);
      } else if (status === 404) {
        return execute404Handler(error);
      } else if (status === 500) {
        if (error.response.data.message && error.response.data.message.includes("JWT")) {
          return executeTokenError(error);
        } else {
          return execute500Handler(error);
        }
      } else {
        return executeOtherErrorHandler(error);
      }
    }
    if (error.message === "Network Error") {
      return executeServerError(error)
    }

  }


  function execute400Handler(props) {
    return {
      type: errorhandlerConstants.HTTP_400_ERROR,
      props: props
    };
  }
  function execute401Handler(props) {
    return {
      type: errorhandlerConstants.HTTP_401_ERROR,
      props: props
    };
  }
  function execute403Handler(props) {
    return {
      type: errorhandlerConstants.HTTP_403_ERROR,
      props: props
    };
  }
  function execute404Handler(props) {
    return {
      type: errorhandlerConstants.HTTP_404_ERROR,
      props: props
    };
  }
  function execute500Handler(props) {

    return {
      type: errorhandlerConstants.HTTP_500_ERROR,
      props: props
    };
  }
  function executeOtherErrorHandler(props) {
    return {
      type: errorhandlerConstants.HTTP_OTHER_ERROR,
      props: props
    };
  }
  function executeTokenError(props) {

    return dispatch => {
      dispatch(authActions.logout());
      history.push("/web/login");
      return {
        type: errorhandlerConstants.HTTP_OTHER_ERROR,
        props: props
      };

    };


  }
  function executeServerError(props) {
    return {
      type: errorhandlerConstants.HTTP_NETWORK_ERROR,
      props: props
    };


  }
}
