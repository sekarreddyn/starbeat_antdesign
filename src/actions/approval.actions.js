import { approvalConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { errorHandlerActions } from ".";
import { toast } from "react-toastify";
export const approvalActions = {
  getAll,
  Approve,
  Reject
};

function getAll(mode, pageable) {
  let params = pageable;
  params.type = mode.type === "videos" ? "VIDEO" : mode.type.toUpperCase();
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "user/submission", {
        params: params
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
    return { type: approvalConstants.APPROVAL_GETALL_REQUEST };
  }
  function success(approvals) {
    return {
      type: approvalConstants.APPROVAL_GETALL_SUCCESS,
      approvals
    };
  }
  function failure(error) {
    return { type: approvalConstants.APPROVAL_GETALL_FAILURE, error };
  }
}

function Approve(mode, id) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}${mode.type}/submission/${id}?approve=${true}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data));
          toast.success("Approved  successfully");
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(approvals) {
    return { type: approvalConstants.APPROVAL_APPROVE_SUCCESS, approvals };
  }
  function failure(error) {
    return { type: approvalConstants.APPROVAL_APPROVE_FAILURE, error };
  }
}
function Reject(mode, id) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}${mode.type}/submission/${id}?approve=${false}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data));
          toast.success("Rejected successfully");
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(approvals) {
    return { type: approvalConstants.APPROVAL_REJECT_SUCCESS, approvals };
  }
  function failure(error) {
    return { type: approvalConstants.APPROVAL_REJECT_FAILURE, error };
  }
}
