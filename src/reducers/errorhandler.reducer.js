import { toast } from "react-toastify";
import { errorhandlerConstants } from "../constants";
import { history } from "../helpers";
const initialState = {
  error: {}
};

export function errorhandler(state = initialState, action) {
  switch (action.type) {
    case errorhandlerConstants.HTTP_400_ERROR:
      toast.error("400 Bad Request");
      history.push("/error");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_401_ERROR:
      toast.error("401 Unauthorized");
      history.push("/signin");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_403_ERROR:
      toast.error("403 Forbidden");
      history.push("/error");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_404_ERROR:
      toast.error("404 Not Found");
      history.push("/error");
      return {
        ...state,
        error: action.error
      };

    case errorhandlerConstants.HTTP_500_ERROR:
      toast.error("500 Internal Server Error");
      history.push("/error");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_OTHER_ERROR:
      toast.error("Something went wrong");
      history.push("/signin");
      return {
        ...state,
        showErrorModal: true,
        errorMessage: action.error.response.data
      };

    default:
      return state;
  }
}
