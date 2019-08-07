import { errorhandlerConstants } from "../constants";
export const errorHandlerActions = {
  handleHTTPError
};

function handleHTTPError(error) {


  if (error.status === 400) {
    if(error && error.data && error.data === "Invalid token."){
      return execute401Handler(error);
    }else{
      return execute400Handler(error);
    }

  } else if (error.status === 401) {
    return execute401Handler(error);
  } else if (error.status === 403) {
    return execute403Handler(error);
  } else if (error.status === 404) {
    return execute404Handler(error);
  } else if (error.status === 500) {
    return execute500Handler(error);
  } else {
    return executeOtherErrorHandler(error);
  }

  function execute400Handler(error) {
    return {
      type: errorhandlerConstants.HTTP_400_ERROR,
      error: error
    };
  }
  function execute401Handler(error) {
    return {
      type: errorhandlerConstants.HTTP_401_ERROR,
      error: error
    };
  }
  function execute403Handler(error) {
    return {
      type: errorhandlerConstants.HTTP_403_ERROR,
      error: error
    };
  }
  function execute404Handler(error) {
    return {
      type: errorhandlerConstants.HTTP_404_ERROR,
      error: error
    };
  }
  function execute500Handler(error) {
    return {
      type: errorhandlerConstants.HTTP_500_ERROR,
      error: error
    };
  }
  function executeOtherErrorHandler(error) {
    return {
      type: errorhandlerConstants.HTTP_OTHER_ERROR,
      error: error
    };
  }
}
