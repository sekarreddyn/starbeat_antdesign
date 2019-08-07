import { userConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { toast } from "react-toastify";
import { errorHandlerActions } from "../actions";
export const userActions = {
  getAll,
  updateUser,
  deleteUser,
  ChangePassword,
  addUser
};

function getAll(page) {
  let data = page;
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "internal/user", {
        params: data
      })
      .then(function (response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function (error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function request() {
    return { type: userConstants.USERS_GETALL_REQUEST };
  }
  function success(usersList) {
    return { type: userConstants.USERS_GETALL_SUCCESS, usersList };
  }
  function failure(error) {
    return { type: userConstants.USERS_GETALL_FAILURE, error };
  }
}
function updateUser(user) {
  return dispatch => {
    http
      .put(`${appConfig.apiUrl}internal/user/${user.id}`, user)
      .then(function (response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("User updated successfully");
        } else {
          dispatch(failure(user));
        }
      })
      .catch(function (error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(user) {
    return { type: userConstants.USER_UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.USER_UPDATE_FAILURE, error };
  }
}
function deleteUser(user) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}internal/user/${user.id}`)
      .then(function (response) {
        if (response.data.success) {
          dispatch(success(user));
          toast.success("User deleted successfully");
        } else {
          dispatch(failure(user));
        }
      })
      .catch(function (error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(user) {
    return { type: userConstants.USER_DELETE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.USER_DELETE_FAILURE, error };
  }
}

function ChangePassword(id, password) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}internal/user/${id}?password=${password}`)
      .then(function (response) {
        if (response.data.success) {
          dispatch(success(response.data));
          toast.success("Password updated successfully");
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function (error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(user) {
    return { type: userConstants.USER_CHANGEPASSWORD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.USER_CHANGEPASSWORD_FAILURE, error };
  }
}
function addUser(user) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}internal/user`, user)
      .then(function (response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("User added successfully");
        } else {
          dispatch(failure(user));
        }
      })
      .catch(function (error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(user) {
    return { type: userConstants.USER_ADD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.USER_ADD_FAILURE, error };
  }
}
