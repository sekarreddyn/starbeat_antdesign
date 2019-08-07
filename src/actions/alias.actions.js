import { aliasConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { toast } from "react-toastify";
import { errorHandlerActions } from "../actions";
export const aliasActions = {
  getAlias,
  createAlias,
  deleteAlias,
  updateAlias
};
function getAlias(type, id) {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + `${type}/${id}/search/alias`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return { type: aliasConstants.GET_ALIAS_REQUEST };
  }
  function success(alias) {
    return { type: aliasConstants.GET_ALIAS_SUCCESS, alias };
  }
  function failure(error) {
    return { type: aliasConstants.GET_ALIAS_FAILURE, error };
  }
}
function createAlias(id, type, data) {
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}${type}/${id}/search/alias`, null, {
        params: data
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return { type: aliasConstants.CREATE_ALIAS_REQUEST };
  }
  function success(alias) {
    return { type: aliasConstants.CREATE_ALIAS_SUCCESS, alias };
  }
  function failure(error) {
    return { type: aliasConstants.CREATE_ALIAS_FAILURE, error };
  }
}
function deleteAlias(type, id) {
  return dispatch => {
    dispatch(request(id));
    http
      .delete(`${appConfig.apiUrl}${type}/search/alias/${id}`)
      .then(function(response) {
        if (response.data.success) {
          toast.success(response.data.data);
          dispatch(success(id));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request(id) {
    return { type: aliasConstants.DELETE_ALIAS_REQUEST, id };
  }
  function success(id) {
    return { type: aliasConstants.DELETE_ALIAS_SUCCESS, id };
  }
  function failure(error) {
    return { type: aliasConstants.DELETE_ALIAS_FAILURE, error };
  }
}
function updateAlias(id, type, data) {
  return dispatch => {
    dispatch(request());
    http
      .put(appConfig.apiUrl + `${type}/search/alias/${id}`, null, {
        params: data
      })
      .then(function(response) {
        if (response.data.success) {
          toast.success("Alias updated successfully");
          dispatch(success(response.data.data));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return { type: aliasConstants.UPDATE_ALIAS_REQUEST };
  }
  function success(alias) {
    return { type: aliasConstants.UPDATE_ALIAS_SUCCESS, alias };
  }
  function failure(error) {
    return { type: aliasConstants.UPDATE_ALIAS_FAILURE, error };
  }
}
