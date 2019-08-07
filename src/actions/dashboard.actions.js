import { dashboardConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { errorHandlerActions } from "../actions";

export const dashboardActions = {
  starsCount,
  templatesCount,
  getActivity,
  getStarCategories,
  getMovieCategories,
  openCloseSidemenu
};

function starsCount() {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "star-list-counts")
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
    return { type: dashboardConstants.STAR_COUNT_GET_REQUEST };
  }
  function success(counts) {
    return { type: dashboardConstants.STAR_COUNT_GET_SUCCESS, counts };
  }
  function failure(error) {
    return { type: dashboardConstants.STAR_COUNT_GET_FAILURE, error };
  }
}

function templatesCount() {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "movie-list-counts?type=MOVIE")
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
    return { type: dashboardConstants.TEMPLATE_COUNT_GET_REQUEST };
  }
  function success(counts) {
    return {
      type: dashboardConstants.TEMPLATE_COUNT_GET_SUCCESS,
      counts
    };
  }
  function failure(error) {
    return { type: dashboardConstants.TEMPLATE_COUNT_GET_FAILURE, error };
  }
}

function getActivity(pageable) {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "data/entry/audit", {
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
    return { type: dashboardConstants.ACTIVITY_GETALL_REQUEST };
  }
  function success(activities) {
    return {
      type: dashboardConstants.ACTIVITY_GETALL_SUCCESS,
      activities
    };
  }
  function failure(error) {
    return { type: dashboardConstants.ACTIVITY_GETALL_FAILURE, error };
  }
}
function getStarCategories() {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}category/type/STAR`)
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
    return { type: dashboardConstants.STAR_CATEGORIES_GET_REQUEST };
  }
  function success(categories) {
    return {
      type: dashboardConstants.STAR_CATEGORIES_GET_SUCCESS,
      categories
    };
  }
  function failure(error) {
    return { type: dashboardConstants.STAR_CATEGORIES_GET_FAILURE, error };
  }
}
function getMovieCategories() {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}category/type/MOVIE`)
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
    return { type: dashboardConstants.TEMPLATE_CATEGORIES_GET_REQUEST };
  }
  function success(categories) {
    return {
      type: dashboardConstants.TEMPLATE_CATEGORIES_GET_SUCCESS,
      categories
    };
  }
  function failure(error) {
    return { type: dashboardConstants.TEMPLATE_CATEGORIES_GET_FAILURE, error };
  }
}
function openCloseSidemenu(isOpen) {
  if (isOpen) {
    return {
      type: dashboardConstants.SIDEMENU_OPEN_HANDLE,
      isOpen
    };
  } else {
    return {
      type: dashboardConstants.SIDEMENU_CLOSE_HANDLE,
      isOpen
    };
  }
}
