import { categoryConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { toast } from "react-toastify";
import { errorHandlerActions } from "../actions";
export const categoryActions = {
  getAll,
  addCategory,
  deleteCategory,
  updateCategory
};

function getAll(mode, url) {
  let type = mode === "movie" ? mode.toUpperCase() : "STAR";
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}category/type/${type}`)
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
    return { type: categoryConstants.CATEGORIES_GETALL_REQUEST };
  }
  function success(categories) {
    return {
      type: categoryConstants.CATEGORIES_GETALL_SUCCESS,
      categories,
      mode,
      url
    };
  }
  function failure(error) {
    return { type: categoryConstants.CATEGORIES_GETALL_FAILURE, error };
  }
}
function deleteCategory(category) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}category/${category.id}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(category));
          toast.success("Category deleted successfully");
        } else {
          dispatch(failure(category));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(category) {
    return { type: categoryConstants.CATEGORY_DELETE_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.CATEGORY_DELETE_FAILURE, error };
  }
}
function addCategory(category) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}category`, category)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(category));
          toast.success("Category added successfully");
        } else {
          dispatch(failure(category));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(category) {
    return { type: categoryConstants.CATEGORY_ADD_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.CATEGORY_ADD_FAILURE, error };
  }
}
function updateCategory(category, categoryId) {
  return dispatch => {
    http
      .put(`${appConfig.apiUrl}category/${categoryId}`, category)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data, categoryId));
          toast.success("Category updated successfully");
        } else {
          dispatch(failure(category));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(category, categoryId) {
    return {
      type: categoryConstants.CATEGORY_UPDATE_SUCCESS,
      category,
      categoryId
    };
  }
  function failure(error) {
    return { type: categoryConstants.CATEGORY_UPDATE_FAILURE, error };
  }
}
