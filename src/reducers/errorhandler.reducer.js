import { toast } from "react-toastify";
import { errorhandlerConstants } from "../constants";
const initialState = {
  showErrorModal: false,
  errorMessage: ""
};

export function errorhandler(state = initialState, action) {

  switch (action.type) {
    case errorhandlerConstants.HTTP_400_ERROR:
      toast.error("400 Bad Request");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_401_ERROR:
      toast.error("401 Unauthorized");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_403_ERROR:
      toast.error("403 Forbidden");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_404_ERROR:
      toast.error("404 Not Found");
      return {
        ...state
      };

    case errorhandlerConstants.HTTP_500_ERROR:
      toast.error("500 Internal Server Error");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_NETWORK_ERROR:
      toast.error("Server Unreachable");
      return {
        ...state
      };
    case errorhandlerConstants.HTTP_OTHER_ERROR:
      toast.error("Something went wrong");
      return {
        ...state,
        showErrorModal: true,
        errorMessage: action.props
      };

    default:
      return state;
  }
}
