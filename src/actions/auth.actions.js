import { authConstants } from "../constants";
import { http, history, appConfig } from "../helpers";
export const authActions = {
  login,
  logout
};

function login(data) {
  return dispatch => {
    dispatch(request({ data }));
    http
      .post(`${appConfig.apiUrl}auth/emp-login`, data)
      .then(function(response) {
        if (response.data) {
          let user = {
            ...response.data,
            token: response.data.token
          };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(success(user));
          history.push("/create-garage");
        } else {
          dispatch(failure(response.data.errors));
        }
      })
      .catch(function(error) {
        dispatch(failure(error.response.data.errors));
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return dispatch => {
    localStorage.removeItem("user");
    dispatch({ type: authConstants.LOGOUT });
    history.push("/login");
  };
}
