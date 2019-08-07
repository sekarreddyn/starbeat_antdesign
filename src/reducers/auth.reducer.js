import { authConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { loggedIn: true, user, error: null }
  : { loggedIn: false, error: null };

export function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
        loading: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.user
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        loading: false,
        error: action.error
      };
    case authConstants.SIGNUP_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
        loading: true
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.user
      };
    case authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        loading: false,
        error: action.error
      };
    case authConstants.LOGOUT:
      return {
        loggingIn: false,
        loading: false,
        user: {}
      };
    default:
      return state;
  }
}
