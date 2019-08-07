import { starConstants } from "../constants";
import { http, appConfig, history } from "../helpers";
import Util from "../components/Utilities/Util";
import { toast } from "react-toastify";
import axios from "axios";
import { errorHandlerActions } from "../actions";

export const starActions = {
  getAll,
  getCategories,
  deleteStar,
  getStar,
  addStar,
  updateStarProfile,
  getStarGallery,
  getStarMovies,
  uploadStarProfileImage,
  uploadStarBannerImage,
  deleteStarProfileImage,
  deleteStarBannerImage,
  deleteStarGalleryImage,
  addStarsToGallery,
  taggedStars,
  removeStarsfromGallery,
  addVideoChannels,
  deleteVideoChannel,
  uploadStarGalleryImage,
  verifyStar,
  markForDelete,
  markForUnDelete,
  getImageFromUrl,
  getSearchByStars,
  getByFilters,
  imageInModal,
  taggedModalColse,
  starGrouping,
  deleteStarFromGroup,
  getBySearch,
  saveAndGo,
  clearWizard,
  getExtenalIds,
  getStarNews,
  addVideos,
  getVideos,
  deleteVideo,
  addStarsToVideos,
  taggedVideoStars,
  removeStarsFromVideos,
  getStarsById,
  addExternalIds,
  uploadInstaStarGalleryImage,
  addInstaVideos,
  addTiktokVideos,
  getInstagramMedia,
  getTiktokMedia,
  addTwitterVideos,
  uploadImageTos3,
  getTwitterMedia,
  addFacebookVideo
};

function getAll(mode, pageable, url) {
  if (mode === "edit" || mode === "add") {
    pageable.verified = true;
  } else {
    delete pageable.verified;
    delete pageable.newEntry;
    delete pageable.markForDelete;
    delete pageable.approved;
    delete pageable.pending;
  }

  return dispatch => {
    dispatch(request());
    Util.pageMode(mode.type, pageable);
    if (mode.type === "categories") {
      http
        .get(`${appConfig.apiUrl}star/category/${mode.id}`, {
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
    } else {
      dispatch(request());
      Util.pageMode(mode.type, pageable);
      http
        .get(appConfig.apiUrl + "star", {
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
    }
  };

  function request() {
    return { type: starConstants.STARS_GETALL_REQUEST };
  }
  function success(stars) {
    return { type: starConstants.STARS_GETALL_SUCCESS, stars, mode, url };
  }
  function failure(error) {
    return { type: starConstants.STARS_GETALL_FAILURE, error };
  }
}
function deleteStar(star) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/${star.id}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(star));
          toast.success("Star Deleted successfully");
        } else {
          dispatch(failure(star));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return { type: starConstants.STAR_DELETE_REQUEST };
  }
  function success(star) {
    return { type: starConstants.STAR_DELETE_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_DELETE_FAILURE, error };
  }
}
function getStar(starId) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/${starId}`)
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
    return { type: starConstants.STAR_GET_REQUEST };
  }
  function success(starDetails) {
    return { type: starConstants.STAR_GET_SUCCESS, starDetails };
  }
  function failure(error) {
    return { type: starConstants.STAR_GET_FAILURE, error };
  }
}

function getCategories() {
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
    return { type: starConstants.STAR_CATEGORIES_REQUEST };
  }
  function success(categoryList) {
    return { type: starConstants.STAR_CATEGORIES_SUCCESS, categoryList };
  }
  function failure(error) {
    return { type: starConstants.STAR_CATEGORIES_FAILURE, error };
  }
}
function addStar(star) {
  let data = star;
  let categoryDTOs = star.categoryDTOs.map(function(item) {
    return { id: item.id };
  });
  data.categoryDTOs = categoryDTOs;
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star`, data)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star added successfully");
          history.push(`/web/star/edit/${response.data.data.id}`);
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
    return { type: starConstants.STAR_ADD_REQUEST };
  }
  function success(star) {
    return { type: starConstants.STAR_ADD_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_ADD_FAILURE, error };
  }
}
function updateStarProfile(star) {
  let data = star;
  let categoryDTOs = star.categoryDTOs.map(function(item) {
    return { id: item.id };
  });
  data.categoryDTOs = categoryDTOs;
  return dispatch => {
    dispatch(request());
    http
      .put(`${appConfig.apiUrl}star/${star.id}`, data)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star updated successfully");
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
    return { type: starConstants.STAR_UPDATEPROFILE_REQUEST };
  }
  function success(star) {
    return { type: starConstants.STAR_UPDATEPROFILE_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_UPDATEPROFILE_FAILURE, error };
  }
}
function getStarGallery(starId, pageable) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/${starId}/gallery`, {
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
      });
  };
  function request() {
    return { type: starConstants.STAR_GETGALLERY_REQUEST };
  }
  function success(gallery) {
    return { type: starConstants.STAR_GETGALLERY_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: starConstants.STAR_GETGALLERY_FAILURE, error };
  }
}
function getStarMovies(starId) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/${starId}/movies`)
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
    return { type: starConstants.STAR_GETMOVIES_REQUEST };
  }
  function success(movies) {
    return { type: starConstants.STAR_GETMOVIES_SUCCESS, movies };
  }
  function failure(error) {
    return { type: starConstants.STAR_GETMOVIES_FAILURE, error };
  }
}
function uploadStarProfileImage(img, starId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${starId}/profile/picture`, formData)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data + "?" + new Date().getTime()));
          toast.success("Profile Image updated successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error, starId));
      });
  };
  function request() {
    return { type: starConstants.STAR_UPLOAD_PROFILE_IMAGE_REQUEST };
  }
  function success(profileUrl) {
    return {
      type: starConstants.STAR_UPLOAD_PROFILE_IMAGE_SUCCESS,
      profileUrl
    };
  }
  function failure(error) {
    return { type: starConstants.STAR_UPLOAD_PROFILE_IMAGE_FAILURE, error };
  }
}
function uploadStarBannerImage(img, starId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${starId}/banner/picture`, formData)
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
        dispatch(errorHandlerActions.handleHTTPError(error, starId));
      });
  };
  function request() {
    return {
      type: starConstants.STAR_UPLOAD_BANNER_IMAGE_REQUEST
    };
  }
  function success(bannerURL) {
    return { type: starConstants.STAR_UPLOAD_BANNER_IMAGE_SUCCESS, bannerURL };
  }
  function failure(error) {
    return { type: starConstants.STAR_UPLOAD_BANNER_IMAGE_FAILURE, error };
  }
}
function deleteStarProfileImage(starId) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/${starId}/profile/picture`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Profile Image  deleted successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error, starId));
      });
  };
  function request() {
    return {
      type: starConstants.STAR_DELETE_PROFILE_IMAGE_FAILURE
    };
  }
  function success(starDetails) {
    return {
      type: starConstants.STAR_DELETE_PROFILE_IMAGE_SUCCESS,
      starDetails
    };
  }
  function failure(error) {
    return { type: starConstants.STAR_DELETE_PROFILE_IMAGE_FAILURE, error };
  }
}
function deleteStarBannerImage(starId) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/${starId}/banner/picture`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Banner Image  deleted successfully");
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error, starId));
      });
  };
  function request() {
    return {
      type: starConstants.STAR_DELETE_BANNER_IMAGE_REQUEST
    };
  }
  function success(starDetails) {
    return {
      type: starConstants.STAR_DELETE_BANNER_IMAGE_SUCCESS,
      starDetails
    };
  }
  function failure(error) {
    return { type: starConstants.STAR_DELETE_FAILURE, error };
  }
}
function deleteStarGalleryImage(starId, imgId) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/${starId}/gallery/${imgId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(imgId));
          toast.success("Gallery Image  deleted successfully");
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
    return {
      type: starConstants.STAR_DELETE_GALLERY_IMAGE_REQUEST
    };
  }
  function success(img) {
    return {
      type: starConstants.STAR_DELETE_GALLERY_IMAGE_SUCCESS,
      img
    };
  }
  function failure(error) {
    return { type: starConstants.STAR_GALLERY_FAILURE, error };
  }
}
function addStarsToGallery(imgId, starIds) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}gallery/${imgId}/add-star`, starIds)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star added successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star) {
    return { type: starConstants.STAR_TAG_STARS_TO_GALLERY_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_TAG_STARS_TO_GALLERY_FAILURE, error };
  }
}
function taggedStars(imgId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}gallery/${imgId}/stars`)
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

  function success(stars) {
    return { type: starConstants.STAR_GET_TAGGED_STARS_SUCCESS, stars };
  }
  function failure(error) {
    return { type: starConstants.STAR_GET_TAGGED_STARS_FAILURE, error };
  }
}

function removeStarsfromGallery(imgId, starIds) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}gallery/${imgId}/delete-star`, {
        data: starIds
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star removed successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(stars) {
    return { type: starConstants.STAR_DELETE_TAGGED_STARS_SUCCESS, stars };
  }
  function failure(error) {
    return { type: starConstants.STAR_DELETE_TAGGED_STARS_FAILURE, error };
  }
}
function addVideoChannels(starId, videoChannelURL) {
  return dispatch => {
    dispatch(request());
    http
      .put(`${appConfig.apiUrl}star/${starId}`, {
        videoChannels: videoChannelURL
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Video channels  added successfully");
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
    return {
      type: starConstants.STAR_ADD_VIDEO_CHANNEL_REQUEST
    };
  }
  function success(star) {
    return { type: starConstants.STAR_ADD_VIDEO_CHANNEL_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_ADD_VIDEO_CHANNEL_FAILURE, error };
  }
}
function deleteVideoChannel(starId, videoChannelURL) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/${starId}/videoChannel/`, {
        params: {
          videoChannelURL
        }
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Video channels  deleted successfully");
        } else {
          dispatch(failure(response.data.data));
          toast.error("Failed to  delete a channel");
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return {
      type: starConstants.STAR_DELETE_VIDEO_CHANNEL_REQUEST
    };
  }
  function success(star) {
    return { type: starConstants.STAR_DELETE_VIDEO_CHANNEL_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_DELETE_VIDEO_CHANNEL_FAILURE, error };
  }
}
function uploadStarGalleryImage(img, starId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${starId}/gallery`, formData)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response));
          dispatch(starActions.getStarGallery(starId));
          toast.success("Gallery image  added successfully");
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
    return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_REQUEST };
  }
  function success(gallery) {
    return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_FAILURE, error };
  }
}
function verifyStar(starId, status, verified) {
  return dispatch => {
    http
      .post(
        `${
          appConfig.apiUrl
        }star/${starId}/state/?active=${status}&verified=${verified}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          if (status === true) {
            toast.success("Star activated successfully");
          }
          if (status === false) {
            toast.success("Star deactivated successfully");
          }
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
        if (status === true) {
          toast.error("Failed to activate a star");
        }
        if (status === false) {
          toast.error("Failed to deactivated  a star");
        }
      });
  };

  function success(star) {
    return { type: starConstants.STAR_VERIFY_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_VERIFY_FAILURE, error };
  }
}

function markForDelete(starId) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/${starId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(true));
          toast.success("Star deleted successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return { type: starConstants.STAR_MARKFORDELETE_REQUEST };
  }
  function success(markForDelete, starId) {
    return {
      type: starConstants.STAR_MARKFORDELETE_SUCCESS,
      markForDelete,
      starId
    };
  }
  function failure(error) {
    return { type: starConstants.STAR_MARKFORDELETE_FAILURE, error };
  }
}
function markForUnDelete(starId) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/undelete/${starId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(false, starId));
          toast.success("Star undeleted successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function request() {
    return { type: starConstants.STAR_MARKFORUNDELETE_REQUEST };
  }
  function success(markForDelete, starId) {
    return {
      type: starConstants.STAR_MARKFORUNDELETE_SUCCESS,
      markForDelete,
      starId
    };
  }
  function failure(error) {
    return { type: starConstants.STAR_MARKFORUNDELETE_FAILURE, error };
  }
}
function getImageFromUrl(url) {
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}image/download`, JSON.stringify(url))
      .then(function(response) {
        if (response.data) {
          dispatch(success(response.data));
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
    return { type: starConstants.STAR_DOWNLOAD_IMAGE_FROM_URL_REQUEST };
  }
  function success(image) {
    return { type: starConstants.STAR_DOWNLOAD_IMAGE_FROM_URL_SUCCESS, image };
  }
  function failure(error) {
    return { type: starConstants.STAR_DOWNLOAD_IMAGE_FROM_URL_FAILURE, error };
  }
}
function getSearchByStars(pageable) {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "star", {
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
    return { type: starConstants.STARS_GETALL_REQUEST };
  }
  function success(stars) {
    return { type: starConstants.STARS_GETALL_SUCCESS, stars };
  }
  function failure(error) {
    return { type: starConstants.STARS_GETALL_FAILURE, error };
  }
}

function getByFilters(mode, page, url) {
  const pageMode = mode;

  let data = page;
  delete page.verified;
  delete page.newEntry;
  delete page.markForDelete;

  return dispatch => {
    dispatch(request());
    Util.pageMode(pageMode.type, data);

    dispatch(request());
    Util.pageMode(pageMode.type, data);
    http
      .get(appConfig.apiUrl + "star/search", {
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
    return { type: starConstants.STARS_GETALL_REQUEST };
  }
  function success(stars) {
    return { type: starConstants.STARS_GETALL_SUCCESS, stars, mode, url };
  }
  function failure(error) {
    return { type: starConstants.STARS_GETALL_FAILURE, error };
  }
}
function imageInModal(value, link) {
  const gallerymodal = value;
  const mediaLink = link;

  if ((gallerymodal, mediaLink)) {
    return {
      type: starConstants.STAR_GALLERY_MODAL_OPEN,
      gallerymodal,
      mediaLink
    };
  } else {
    return {
      type: starConstants.STAR_GALLERY_MODAL_CLOSE,
      gallerymodal
    };
  }
}
function taggedModalColse() {
  const stars = [];
  return {
    type: starConstants.STAR_TAG_MODAL_CLOSE,
    stars
  };
}
function starGrouping(star, id) {
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${id}/grouping/`, star)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star grouped successfully");
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
    return { type: starConstants.STAR_GROUP_SUCCESS };
  }
  function success(star) {
    return { type: starConstants.STAR_GROUP_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_GROUP_FAILURE, error };
  }
}
function deleteStarFromGroup(star, id) {
  return dispatch => {
    dispatch(request(star[0].starId));
    http
      .delete(`${appConfig.apiUrl}star/${id}/grouping`, { data: star })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(star[0].starId));
          toast.success("Star deleted successfully");
        } else {
          dispatch(failure(star));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request(id) {
    return { type: starConstants.STAR_GROUPED_DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: starConstants.STAR_GROUPED_DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: starConstants.STAR_GROUPED_DELETE_FAILURE, error };
  }
}

function getBySearch(mode, pageable, url) {
  if (mode === "edit" || mode === "add") {
    pageable.verified = true;
  } else {
    delete pageable.verified;
    delete pageable.newEntry;
    delete pageable.markForDelete;
  }

  return dispatch => {
    dispatch(request());
    Util.pageMode(mode.type, pageable);
    http
      .get(appConfig.apiUrl + "star", {
        params: pageable
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data, pageable));
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
    return { type: starConstants.STARS_GETALL_BYSEARCH_REQUEST };
  }
  function success(stars) {
    return {
      type: starConstants.STARS_GETALL_BYSEARCH_SUCCESS,
      stars,
      mode,
      url,
      pageable
    };
  }
  function failure(error) {
    return { type: starConstants.STARS_GETALL_BYSEARCH_FAILURE, error };
  }
}
function saveAndGo(isEnabled) {
  return {
    type: starConstants.STAR_SAVE_AND_GO,
    isEnabled
  };
}
function clearWizard() {
  const isEnabled = false;
  return {
    type: starConstants.STAR_SAVE_AND_GO,
    isEnabled
  };
}
function getExtenalIds(Id) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/${Id}/externalds`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
      });
  };
  function request() {
    return { type: starConstants.STAR_GETEXTENAL_ID_REQUEST };
  }
  function success(ids) {
    return { type: starConstants.STAR_GETEXTENAL_ID_SUCCESS, ids };
  }
  function failure(error) {
    return { type: starConstants.STAR_GETEXTENAL_ID_FAILURE, error };
  }
}
function getStarNews(starId, pageable) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/${starId}/news`, {
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
    return { type: starConstants.STAR_GET_NEWS_REQUEST };
  }
  function success(news) {
    return { type: starConstants.STAR_GET_NEWS_SUCCESS, news };
  }
  function failure(error) {
    return { type: starConstants.STAR_GET_NEWS_FAILURE, error };
  }
}
function addVideos(starId, videoURL) {
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${starId}/yt-video?url=${videoURL}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Video   added  successfully");
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };
  function request() {
    return { type: starConstants.STAR_ADD_VIDEO_REQUEST };
  }
  function success(video) {
    return {
      type: starConstants.STAR_ADD_VIDEO_SUCCESS,
      video,
      videoURL
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_ADD_VIDEO_FAILURE,
      error,
      videoURL
    };
  }
}
function getVideos(starId, pageable) {
  return dispatch => {
    dispatch(request());
    http
      .get(`${appConfig.apiUrl}star/${starId}/videos`, {
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
    return { type: starConstants.STAR_GET_VIDEOS_REQUEST };
  }
  function success(videos) {
    return {
      type: starConstants.STAR_GET_VIDEOS_SUCCESS,
      videos
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_GET_VIDEOS_FAILURE,
      error
    };
  }
}

function deleteVideo(starId, videoURL) {
  return dispatch => {
    dispatch(request());
    http
      .delete(`${appConfig.apiUrl}star/video/${starId}`, {
        params: {
          videoURL
        }
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(starId));
          toast.success("Video deteted successfully");
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };
  function request() {
    return { type: starConstants.STAR_DELETE_VIDEO_REQUEST };
  }
  function success(id) {
    return {
      type: starConstants.STAR_DELETE_VIDEO_SUCCESS,
      id
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_DELETE_VIDEO_FAILURE,
      error
    };
  }
}

function addStarsToVideos(VideoId, starIds) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}star/video/${VideoId}/add`, starIds)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star added successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star) {
    return {
      type: starConstants.TAG_STARS_TO_VIDEO_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: starConstants.TAG_STARS_TO_VIDEO_FAILURE,
      error
    };
  }
}
function taggedVideoStars(videoId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}star/video/${videoId}`)
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

  function success(stars) {
    return { type: starConstants.VIDEO_GET_TAGGED_STARS_SUCCESS, stars };
  }
  function failure(error) {
    return { type: starConstants.VIDEO_GET_TAGGED_STARS_FAILURE, error };
  }
}
function removeStarsFromVideos(VideoId, starIds) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}star/video/${VideoId}/remove`, {
        data: starIds
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star removed successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star) {
    return {
      type: starConstants.REMOVE_STARS_FROM_VIDEOS_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: starConstants.REMOVE_STARS_FROM_VIDEOS_FAILURE,
      error
    };
  }
}
function getStarsById(id) {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + `star/${id}/compact`)
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
    return { type: starConstants.STAR_SEARCH_BY_ID_REQUEST };
  }
  function success(star) {
    return { type: starConstants.STAR_SEARCH_BY_ID_SUCCESS, star };
  }
  function failure(error) {
    return { type: starConstants.STAR_SEARCH_BY_ID_FAILURE, error };
  }
}
function addExternalIds(starId, externalId) {
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${starId}/externalds`, externalId)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(externalId));
          toast.success("External id   added successfully");
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
    return { type: starConstants.STAR_ADD_EXTERNALID_REQUEST };
  }
  function success(externalId) {
    return { type: starConstants.STAR_ADD_EXTERNALID_SUCCESS, externalId };
  }
  function failure(error) {
    return { type: starConstants.STAR_ADD_EXTERNALID_FAILURE, error };
  }
}

function uploadInstaStarGalleryImage(data, img, starId) {
  return dispatch => {
    dispatch(request());
    http
      .get(
        `${
          appConfig.apiEndpoint
        }/user/mobile/api/v1/upload/request/url?bucketName=cloud_file_directory_star_gallery&keyName=${
          data.externalId
        }.jpg`
      )
      .then(function(response) {
        if (response.data.success) {
          data.url = response.data.data.split("?")[0];
          dispatch(uploadImageTos3(response.data.data, img, starId, data));
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };
  function request() {
    return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_REQUEST };
  }
  function success(gallery) {
    return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_FAILURE, error };
  }
}
function addInstaVideos(starId, data) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}star/${starId}/insta-video`, data)
      .then(function(response) {
        if (response.data.success) {
          toast.success("Video   added  successfully");
          dispatch(success(response.data.data));
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };

  function success(video) {
    return {
      type: starConstants.STAR_ADD_VIDEO_SUCCESS,
      video
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_ADD_VIDEO_FAILURE,
      error
    };
  }
}
function addTiktokVideos(starId, data) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}star/${starId}/tiktok-video`, data)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Video   added  successfully");
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };

  function success(video) {
    return {
      type: starConstants.STAR_ADD_VIDEO_SUCCESS,
      video
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_ADD_VIDEO_FAILURE,
      error
    };
  }
}

function addTwitterVideos(starId, data) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}star/${starId}/twitter-video`, data)
      .then(function(response) {
        if (response.data.success) {
          toast.success("Video   added  successfully");
          dispatch(success(response.data.data));
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };

  function success(video) {
    return {
      type: starConstants.STAR_ADD_VIDEO_SUCCESS,
      video
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_ADD_VIDEO_FAILURE,
      error
    };
  }
}
function getInstagramMedia(id, videoURL) {
  const instagramApiUrl = "https://api.instagram.com";
  return dispatch => {
    dispatch(request());
    axios
      .get(`${instagramApiUrl}/oembed/?url=${videoURL}`)
      .then(res => {
        if (res.status === 200) {
          const {
            author_id,
            media_id,
            title,
            thumbnail_url,
            thumbnail_width,
            thumbnail_height
          } = res.data;
          let data = {
            url: videoURL,
            externalId: media_id,
            externalAuthorId: author_id,
            caption: title,
            width: thumbnail_width,
            height: thumbnail_height,
            thumbnailUrl: thumbnail_url
          };
          dispatch(success());
          dispatch(starActions.addInstaVideos(id, data));
        }
      })
      .catch(err => {
        dispatch(failure(err));
        const { data, status } = err.response;
        toast.error(`${data} -(${status})`);
      });
  };
  function request() {
    return { type: starConstants.STAR_GET_INSTAGRAM_MEDIA_REQUEST };
  }
  function success(videos) {
    return {
      type: starConstants.STAR_GET_INSTAGRAM_MEDIA_SUCCESS,
      videos
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_GET_INSTAGRAM_MEDIA_FAILURE,
      error
    };
  }
}
function getTiktokMedia(starId, videoURL) {
  const nocors = "https://cors-anywhere.herokuapp.com/";
  return dispatch => {
    dispatch(request());
    axios.get(`${nocors}${videoURL}`).then(res => {
      if (res.status === 200) {
        let htmlString = res.data;
        if (htmlString) {
          let s = htmlString;
          let s1 = s.substring(s.indexOf("window.__INIT_PROPS__") + 1);
          s1.trim();
          let propsString = s1.substring(
            s1.lastIndexOf("<script>window.__INIT_PROPS__= {") + 1,
            s1.lastIndexOf("</head>")
          );
          let subPropString = propsString.substring(
            propsString.lastIndexOf("__INIT_PROPS__=") + 1,
            propsString.lastIndexOf("</script>")
          );

          let validJson = subPropString.replace("indow.__INIT_PROPS__ = ", "");
          let jsonData = JSON.parse(validJson);
          if (jsonData) {
            let parsedJsonData = jsonData["/@:uniqueId/video/:id"];
            if (parsedJsonData) {
              const {
                videoData,
                shareMeta,
                $pageUrl,
                $origin
              } = parsedJsonData;
              if (videoData && shareMeta && $pageUrl && $origin) {
                const { itemInfos, authorInfos } = videoData;
                const { image } = shareMeta;
                const { height, url, width } = image;
                const { id, text, video } = itemInfos;
                const { userId } = authorInfos;
                let data = {
                  url: $origin + $pageUrl,
                  externalId: id,
                  externalAuthorId: userId,
                  caption: text,
                  width,
                  height,
                  thumbnailUrl: url
                };
                dispatch(success());
                dispatch(starActions.addInstaVideos(starId, data));
              } else {
                toast.error("Invalid tiktok url");
                dispatch(failure());
              }
            }
          }
        }
      }
    });
  };
  function request() {
    return { type: starConstants.STAR_GET_TIKTOK_MEDIA_REQUEST };
  }
  function success() {
    return {
      type: starConstants.STAR_GET_TIKTOK_MEDIA_SUCCESS
    };
  }
  function failure() {
    return {
      type: starConstants.STAR_GET_TIKTOK_MEDIA_FAILURE
    };
  }
}
function uploadImageTos3(url, data, starId, imageData) {
  let headers = {
    "x-amz-meta-file.size.height": "800",
    "x-amz-meta-file.size.width": "600",
    "Content-type": "image/jpeg",
    "x-amz-acl": "public-read"
  };
  return dispatch => {
    axios
      .put(url, data, { headers: headers })
      .then(function(response) {
        dispatch(uploadImage(imageData, starId));
      })
      .catch(function(error) {})
      .finally(function() {});
  };

  function uploadImage(data, starId) {
    return dispatch => {
      dispatch(request());
      http
        .post(`${appConfig.apiUrl}star/${starId}/gallery/external`, data)
        .then(function(response) {
          if (response.data.success) {
            dispatch(success(response));
            dispatch(starActions.getStarGallery(starId));
            toast.success("Gallery image  added successfully");
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
      return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_REQUEST };
    }
    function success(gallery) {
      return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_SUCCESS, gallery };
    }
    function failure(error) {
      return { type: starConstants.STAR_UPLOAD_GALLERY_IMAGE_FAILURE, error };
    }
  }
}
function getTwitterMedia(starId, videoURL) {
  const nocors = "https://cors-anywhere.herokuapp.com/";
  return dispatch => {
    dispatch(request());
    axios.get(`${nocors}${videoURL}`).then(res => {
      if (res.status === 200) {
        let data = res.data;
        console.log("data", data);
        let el = document.createElement("html");
        el.innerHTML = data;
        function getMeta(metaName) {
          const metas = el.getElementsByTagName("meta");

          for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("property") === metaName) {
              return metas[i].getAttribute("content");
            }
          }
          return "";
        }
        let imgData = {
          url: getMeta("og:video:url"),
          externalId: getMeta("al:android:url").replace(/^\D+/g, ""),
          externalAuthorId: "",
          caption: getMeta("og:description"),
          width: "",
          height: "",
          thumbnailUrl: getMeta("og:image")
        };

        dispatch(success());
        dispatch(starActions.addTwitterVideos(starId, imgData));
      } else {
        toast.error("Invalid twitter url");
        dispatch(failure());
      }
    });
  };
  function request() {
    return { type: starConstants.STAR_GET_TIKTOK_MEDIA_REQUEST };
  }
  function success() {
    return {
      type: starConstants.STAR_GET_TIKTOK_MEDIA_SUCCESS
    };
  }
  function failure() {
    return {
      type: starConstants.STAR_GET_TIKTOK_MEDIA_FAILURE
    };
  }
}
function addFacebookVideo(starId, videoURL) {
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}star/${starId}/facebook-video?url=${videoURL}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Video   added  successfully");
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };
  function request() {
    return { type: starConstants.STAR_ADD_VIDEO_REQUEST };
  }
  function success(video) {
    return {
      type: starConstants.STAR_ADD_VIDEO_SUCCESS,
      video,
      videoURL
    };
  }
  function failure(error) {
    return {
      type: starConstants.STAR_ADD_VIDEO_FAILURE,
      error,
      videoURL
    };
  }
}
