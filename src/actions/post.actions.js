import { postConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { errorHandlerActions } from ".";
import { toast } from "react-toastify";
export const postActions = {
  getAll,
  createPost,
  updatePost,
  uploadPostBannerImage,
  markForDelete,
  getPost,
  getPostGallery,
  uploadPostGalleryImage,
  imageInModal,
  addStarsToPost,
  deleteStarsFromPost
};

function getAll(mode, pageable, url) {
  pageable.postType = mode.type.toUpperCase();
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}post`, {
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
    return { type: postConstants.POST_GETALL_REQUEST };
  }
  function success(post) {
    return {
      type: postConstants.POST_GETALL_SUCCESS,
      post,
      mode,
      url
    };
  }
  function failure(error) {
    return { type: postConstants.POST_GETALL_FAILURE, error };
  }
}

function createPost(post) {
  return dispatch => {
    dispatch(request());
    http
      .post(
        `${appConfig.apiUrl}user/post?post=${encodeURI(JSON.stringify(post))}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Post added successfully");
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
    return { type: postConstants.POST_ADD_REQUEST };
  }
  function success(postDetails) {
    return { type: postConstants.POST_ADD_SUCCESS, postDetails };
  }
  function failure(error) {
    return { type: postConstants.POST_ADD_FAILURE, error };
  }
}
function updatePost(post, id) {
  return dispatch => {
    dispatch(request());
    http
      .put(
        `${appConfig.apiUrl}user/post/${id}?post=${encodeURI(
          JSON.stringify(post)
        )}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Post updated successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error));
        dispatch(failure(error));
      });
  };
  function request() {
    return { type: postConstants.POST_UPDATE_REQUEST };
  }
  function success(postDetails) {
    return { type: postConstants.POST_UPDATE_SUCCESS, postDetails };
  }
  function failure(error) {
    return { type: postConstants.POST_UPDATE_FAILURE, error };
  }
}
function uploadPostBannerImage(img, postId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}post/${postId}/banner`, formData)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data + "?" + new Date().getTime()));
          toast.success("Banner Image updated successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error, postId));
      });
  };

  function success(bannerImageLocation) {
    return {
      type: postConstants.POST_UPLOAD_BANNER_IMAGE_SUCCESS,
      bannerImageLocation
    };
  }
  function failure(error) {
    return { type: postConstants.POST_UPLOAD_BANNER_IMAGE_FAILURE, error };
  }
}
function markForDelete(postId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}user/post/${postId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(postId));
          toast.success("Post deleted successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(id) {
    return { type: postConstants.POST_MARKFORDELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: postConstants.POST_MARKFORDELETE_FAILURE, error };
  }
}
function getPost(postId) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}post/${postId}`)
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
    return { type: postConstants.POST_GET_REQUEST };
  }
  function success(postDetails) {
    return { type: postConstants.POST_GET_SUCCESS, postDetails };
  }
  function failure(error) {
    return { type: postConstants.POST_GET_FAILURE, error };
  }
}
function getPostGallery(postId, pageable) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}post/${postId}/gallery`, {
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
  function request(gallery) {
    return { type: postConstants.POST_GET_GALLERY_REQUEST, gallery };
  }
  function success(gallery) {
    return { type: postConstants.POST_GET_GALLERY_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: postConstants.POST_GET_GALLERY_FAILURE, error };
  }
}
function uploadPostGalleryImage(img, postId, data) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}post/${postId}/gallery-caption`, formData, {
        params: data
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Gallery Image updated successfully");
          dispatch(postActions.getPostGallery(postId));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error, postId));
      });
  };

  function success(gallery) {
    return { type: postConstants.POST_UPLOAD_GALLERY_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: postConstants.POST_UPLOAD_GALLERY_FAILURE, error };
  }
}
function addStarsToPost(post, id) {
  return dispatch => {
    http
      .put(
        `${appConfig.apiUrl}user/post/${id}?post=${encodeURI(
          JSON.stringify(post)
        )}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Post updated successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error));
        dispatch(failure(error));
      });
  };

  function success(postDetails) {
    return { type: postConstants.POST_UPDATE_SUCCESS, postDetails };
  }
  function failure(error) {
    return { type: postConstants.POST_UPDATE_FAILURE, error };
  }
}
function deleteStarsFromPost(postId, starId) {
  return dispatch => {
    http
      .post(
        `${
          appConfig.apiUrl
        }user/post/${postId}/add-remove-stars?removeStarIds=${starId}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star deleted successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error));
        dispatch(failure(error));
      });
  };

  function success(postDetails) {
    return { type: postConstants.POST_STAR_DELETE_SUCCESS, postDetails };
  }
  function failure(error) {
    return { type: postConstants.POST_UPDATE_FAILURE, error };
  }
}
function imageInModal(value, link) {
  const gallerymodal = value;
  const mediaLink = link;

  if ((gallerymodal, mediaLink)) {
    return {
      type: postConstants.POST_GALLERY_MODAL_OPEN,
      gallerymodal,
      mediaLink
    };
  } else {
    return {
      type: postConstants.POST_GALLERY_MODAL_CLOSE,
      gallerymodal
    };
  }
}
