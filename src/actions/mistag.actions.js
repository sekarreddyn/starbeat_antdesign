import { mistagConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { errorHandlerActions } from "../actions";
import { toast } from "react-toastify";
export const mistagActions = {
  getAll,
  TagOrMisTagApprove,
  TagOrMisTagReject,
  getMistag
};

function getAll(mode, pageable, url, tagType) {
  function getType() {
    if (mode.type === "videos") {
      return "video";
    } else {
      return mode.type;
    }
  }

  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + getType() + "/star/" + tagType, {
        params: pageable
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
    return { type: mistagConstants.TAG_OR_MISTAG_GETALL_REQUEST };
  }
  function success(tags) {
    return {
      type: mistagConstants.TAG_OR_MISTAG_GETALL_SUCCESS,
      tags,
      mode,
      url
    };
  }
  function failure(error) {
    return { type: mistagConstants.TAG_OR_MISTAG_GETALL_FAILURE, error };
  }
}

function TagOrMisTagApprove(type, id, tagType) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}${type}/star/${tagType}/${id}?link=${true}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data));
          toast.success(`${capitalize(tagType)} approved  successfully`);
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(tags) {
    return { type: mistagConstants.TAG_OR_MISTAG_APPROVE_SUCCESS, tags };
  }
  function failure(error) {
    return { type: mistagConstants.TAG_OR_MISTAG_APPROVE_FAILURE, error };
  }
}
function TagOrMisTagReject(type, id, tagType) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}${type}/star/${tagType}/${id}?link=${false}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data));
          toast.success(`${capitalize(tagType)} rejected successfully`);
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(tags) {
    return { type: mistagConstants.TAG_OR_MISTAG_REJECT_SUCCESS, tags };
  }
  function failure(error) {
    return { type: mistagConstants.TAG_OR_MISTAG_REJECT_FAILURE, error };
  }
}
function getMistag(entityType, entityId, tagType) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}${entityType}/${entityId}/${tagType}`)
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
    return { type: mistagConstants.TAG_OR_MISTAG_GET_REQUEST };
  }
  function success(tags) {
    return {
      type: mistagConstants.TAG_OR_MISTAG_GET_SUCCESS,
      tags
    };
  }
  function failure(error) {
    return { type: mistagConstants.TAG_OR_MISTAG_GET_FAILURE, error };
  }
}
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
