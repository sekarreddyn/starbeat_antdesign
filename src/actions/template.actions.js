import { templateConstants } from "../constants";
import { http, appConfig } from "../helpers";
import Util from "../components/Utilities/Util";
import { toast } from "react-toastify";
import { errorHandlerActions } from "../actions";
export const templateActions = {
  getAll,
  getCategories,
  deleteTemplate,
  getTemplate,
  addTemplate,
  updateTemplateProfile,
  getTemplateGallery,
  getTemplateMovies,
  uploadTemplateProfileImage,
  uploadTemplateBannerImage,
  deleteTemplateProfileImage,
  deleteTemplateBannerImage,
  deleteTemplateGalleryImage,
  addTemplatesToGallery,
  taggedTemplates,
  removeTemplatesfromGallery,
  addVideo,
  deleteVideoChannel,
  uploadTemplateGalleryImage,
  verifyTemplate,
  markForDelete,
  markForUnDelete,
  getImageFromUrl,
  getLanguages,
  getRelationships,
  getRoles,
  getVideosTypes,
  getVideos,
  addVideos,
  deleteVideo,
  deleteStarFromTemplate,
  starMarkForDelete,
  starMarkForUnDelete,
  addCastCrew,
  getIvaImages,
  addIvaImagesToGallery,
  templateSearch,
  updateStarInTemplate,
  mergeStars,
  imageInModal,
  unDeleteStarFromTemplate,
  getExtenalIds,
  addStarsToVideos,
  taggedStars,
  removeStarsFromVideos,
  groupTemplate,
  getGroupedTemplates,
  deleteGroupedTemplate,
  updateStarsInTemplate,
  getCastRoles,
  getCrewRoles
};

function getAll(mode, pageable, url) {
  delete pageable.verified;
  delete pageable.newEntry;
  delete pageable.markForDelete;
  delete pageable.approved;
  delete pageable.pending;
  return dispatch => {
    dispatch(request());
    Util.pageMode(mode.type, pageable);
    if (mode.type === "categories") {
      http
        .get(`${appConfig.apiUrl}template/category/${mode.id}`, {
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
    } else if (mode.type === "search") {
      pageable.pageSize = 25;
      pageable.templateType = "Movie";

      http
        .get(appConfig.apiUrl + "search/template", {
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
      http
        .get(appConfig.apiUrl + "template", {
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
    return { type: templateConstants.TEMPLATES_GETALL_REQUEST };
  }
  function success(templates) {
    return {
      type: templateConstants.TEMPLATES_GETALL_SUCCESS,
      templates,
      mode,
      url
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATES_GETALL_FAILURE, error };
  }
}
function deleteTemplate(template) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/${template.id}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(template));
        } else {
          dispatch(failure(template));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(template) {
    return { type: templateConstants.TEMPLATE_DELETE_SUCCESS, template };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_DELETE_FAILURE, error };
  }
}
function getTemplate(templateId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/${templateId}`)
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

  function success(templateDetails) {
    return { type: templateConstants.TEMPLATE_GET_SUCCESS, templateDetails };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_FAILURE, error };
  }
}

function getCategories() {
  return dispatch => {
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

  function success(categoryList) {
    return {
      type: templateConstants.TEMPLATE_CATEGORIES_SUCCESS,
      categoryList
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_CATEGORIES_FAILURE, error };
  }
}
function addTemplate(template) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}movie`, template)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Template added successfully");
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error));
          const errorMsg = error.response.data.data;
          toast.error(errorMsg);
        }
      });
  };

  function success(template) {
    return { type: templateConstants.TEMPLATE_ADD_SUCCESS, template };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_ADD_FAILURE, error };
  }
}
function updateTemplateProfile(template) {
  return dispatch => {
    http
      .put(`${appConfig.apiUrl}movie/${template.id}`, template)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Template updated successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(template) {
    return { type: templateConstants.TEMPLATE_UPDATEPROFILE_SUCCESS, template };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_UPDATEPROFILE_FAILURE, error };
  }
}
function getTemplateGallery(templateId, pageable) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/${templateId}/gallery`, {
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

  function success(gallery) {
    return { type: templateConstants.TEMPLATE_GETGALLERY_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GETGALLERY_FAILURE, error };
  }
}
function getTemplateMovies(templateId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/${templateId}/movies`)
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

  function success(movies) {
    return { type: templateConstants.TEMPLATE_GETMOVIES_SUCCESS, movies };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GETMOVIES_FAILURE, error };
  }
}
function uploadTemplateProfileImage(img, templateId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    http
      .post(
        `${
          appConfig.apiUrl
        }template/${templateId}/banner/image?banner=${false}`,
        formData
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Thumbnail  image created successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(template) {
    return {
      type: templateConstants.TEMPLATE_UPLOAD_PROFILE_IMAGE_SUCCESS,
      template
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_UPLOAD_PROFILE_IMAGE_FAILURE,
      error
    };
  }
}
function uploadTemplateBannerImage(img, templateId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}template/${templateId}/banner/image`, formData)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Banner  image created successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(template) {
    return {
      type: templateConstants.TEMPLATE_UPLOAD_BANNER_IMAGE_SUCCESS,
      template
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_UPLOAD_BANNER_IMAGE_FAILURE,
      error
    };
  }
}
function deleteTemplateProfileImage(templateId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/${templateId}/thumbnail/image`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Thumbnail  image deleted successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(templateDetails) {
    return {
      type: templateConstants.TEMPLATE_DELETE_PROFILE_IMAGE_SUCCESS,
      templateDetails
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DELETE_PROFILE_IMAGE_FAILURE,
      error
    };
  }
}
function deleteTemplateBannerImage(templateId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/${templateId}/banner/image`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Banner  image deleted successfully");
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(templateDetails) {
    return {
      type: templateConstants.TEMPLATE_DELETE_BANNER_IMAGE_SUCCESS,
      templateDetails
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_DELETE_FAILURE, error };
  }
}
function deleteTemplateGalleryImage(templateId, imgId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/${templateId}/gallery/${imgId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(imgId));
          toast.success("Gallery image deleted successfully");
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(img) {
    return {
      type: templateConstants.TEMPLATE_DELETE_GALLERY_IMAGE_SUCCESS,
      img
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GALLERY_FAILURE, error };
  }
}
function addTemplatesToGallery(imgId, templateIds) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}gallery/${imgId}/template/tag`, templateIds)
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

  function success(template) {
    return {
      type: templateConstants.TEMPLATE_TAG_TEMPLATES_TO_GALLERY_SUCCESS,
      template
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_TAG_TEMPLATES_TO_GALLERY_FAILURE,
      error
    };
  }
}
function taggedTemplates(imgId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}gallery/${imgId}/template/tag`)
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

  function success(templates) {
    return {
      type: templateConstants.TEMPLATE_GET_TAGGED_TEMPLATES_SUCCESS,
      templates
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_GET_TAGGED_TEMPLATES_FAILURE,
      error
    };
  }
}

function removeTemplatesfromGallery(imgId, templateIds) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}gallery/${imgId}/template/tag`, {
        data: templateIds
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

  function success(templates) {
    return {
      type: templateConstants.TEMPLATE_DELETE_TAGGED_TEMPLATES_SUCCESS,
      templates
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DELETE_TAGGED_TEMPLATES_FAILURE,
      error
    };
  }
}
function addVideo(templateId, videoChannelURL) {
  return dispatch => {
    http
      .put(`${appConfig.apiUrl}template/${templateId}/videos`, {
        videoChannels: videoChannelURL
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

  function success(videos) {
    return {
      type: templateConstants.TEMPLATE_ADD_VIDEO_CHANNEL_SUCCESS,
      videos
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_ADD_VIDEO_CHANNEL_FAILURE,
      error
    };
  }
}
function getVideos(templateId, pageable) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/${templateId}/videos`, {
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

  function success(videos) {
    return {
      type: templateConstants.TEMPLATE_GET_VIDEO_CHANNEL_SUCCESS,
      videos
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_GET_VIDEO_CHANNEL_FAILURE,
      error
    };
  }
}
function deleteVideoChannel(templateId, videoChannelURL) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/${templateId}/videoChannel/`, {
        params: {
          videoChannelURL
        }
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Video  channel added successfully");
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(template) {
    return {
      type: templateConstants.TEMPLATE_DELETE_VIDEO_CHANNEL_SUCCESS,
      template
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DELETE_VIDEO_CHANNEL_FAILURE,
      error
    };
  }
}
function uploadTemplateGalleryImage(img, templateId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    dispatch(request());
    http
      .post(`${appConfig.apiUrl}template/${templateId}/gallery`, formData)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Gallery image uploaded successfully");
          dispatch(templateActions.getTemplateGallery(templateId));
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
    return { type: templateConstants.TEMPLATE_UPLOAD_GALLERY_IMAGE_REQUEST };
  }
  function success(gallery) {
    return {
      type: templateConstants.TEMPLATE_UPLOAD_GALLERY_IMAGE_SUCCESS,
      gallery
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_UPLOAD_GALLERY_IMAGE_FAILURE,
      error
    };
  }
}
function verifyTemplate(templateId, status, verified, isVerified) {
  return dispatch => {
    http
      .post(
        `${
          appConfig.apiUrl
        }template/${templateId}/state/?active=${status}&verified=${verified}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          if (status === false && isVerified) {
            toast.success("Template deactivated  successfully");
          }
          if (status === true && isVerified) {
            toast.success("Template activated  successfully");
          }
          if (verified && !isVerified) {
            toast.success("Template verified  successfully");
          }
          if (!verified && !isVerified) {
            toast.success("Template unverified  successfully");
          }
        } else {
          dispatch(failure(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
        if (status === 0 && isVerified) {
          toast.error("Failed to deactivated a template");
        }
        if (status === 1 && isVerified) {
          toast.error("Failed to activated a template");
        }
        if (verified && !isVerified) {
          toast.error("Failed to verified a template");
        }
        if (!verified && !isVerified) {
          toast.error("Failed to unverified a template");
        }
      });
  };

  function success(template) {
    return { type: templateConstants.TEMPLATE_VERIFY_SUCCESS, template };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_VERIFY_FAILURE, error };
  }
}

function markForDelete(templateId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/${templateId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(true));
          toast.success("Template deleted  successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(markForDelete) {
    return {
      type: templateConstants.TEMPLATE_MARKFORDELETE_SUCCESS,
      markForDelete
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_MARKFORDELETE_FAILURE, error };
  }
}
function markForUnDelete(templateId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/undelete/${templateId}`)
      .then(function(response) {
        if (response.data.success) {
          toast.success("Template undelete  successfully");
          dispatch(success(false));
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(markForDelete) {
    return {
      type: templateConstants.TEMPLATE_MARKFORUNDELETE_SUCCESS,
      markForDelete
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_MARKFORUNDELETE_FAILURE, error };
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
      });
  };

  function request() {
    return { type: templateConstants.TEMPLATE_DOWNLOAD_IMAGE_FROM_URL_REQUEST };
  }
  function success(image) {
    return {
      type: templateConstants.TEMPLATE_DOWNLOAD_IMAGE_FROM_URL_SUCCESS,
      image
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DOWNLOAD_IMAGE_FROM_URL_FAILURE,
      error
    };
  }
}
function getLanguages() {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}movie/language/list`)
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

  function success(languages) {
    return {
      type: templateConstants.TEMPLATE_LANGUAGE_SUCCESS,
      languages
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_LANGUAGE_FAILURE, error };
  }
}
function getRelationships() {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}star/relationships`)
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

  function success(relationships) {
    return {
      type: templateConstants.TEMPLATE_GET_RELATIONSHIPS_SUCCESS,
      relationships
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_GET_RELATIONSHIPS_FAILURE,
      error
    };
  }
}
function getRoles() {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}star/roles`)
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

  function success(roles) {
    return {
      type: templateConstants.TEMPLATE_GET_ROLES_SUCCESS,
      roles
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_ROLES_FAILURE, error };
  }
}

function getVideosTypes() {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}video/types`)
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

  function success(videoTypes) {
    return {
      type: templateConstants.TEMPLATE_GET_VIDEO_TYPES_SUCCESS,
      videoTypes
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_VIDEO_TYPES_FAILURE, error };
  }
}
function addVideos(templateId, videoChannelURL) {
  const { type, source, url } = videoChannelURL[0];
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}template/${templateId}/videos`, null, {
        params: {
          type,
          source,
          url
        }
      })
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data, videoChannelURL));
          toast.success("Video   added  successfully");
        } else {
          if (response.data.reason === "Video already exists") {
            toast.error(response.data.reason);
            dispatch(failure(response.data.data, videoChannelURL));
          } else {
            dispatch(failure(response.data.data, videoChannelURL));
            toast.error(response.data.data, videoChannelURL);
          }
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(failure(error, videoChannelURL));
          const errorMsg = error.response.data.data || "Failed to add a video";
          toast.error(errorMsg);
        }
      });
  };

  function success(videos) {
    return {
      type: templateConstants.TEMPLATE_ADD_VIDEO_CHANNEL_SUCCESS,
      videos,
      videoChannelURL
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_ADD_VIDEO_CHANNEL_FAILURE,
      error,
      videoChannelURL
    };
  }
}
function deleteVideo(VideoId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}template/video/${VideoId}`)
      .then(function(response) {
        if (response.data.success) {
          toast.success("Video url  deleted  successfully");
          dispatch(success(VideoId));
        } else {
          dispatch(failure(VideoId));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(id) {
    return {
      type: templateConstants.TEMPLATE_DELETE_VIDEO_CHANNEL_SUCCESS,
      id
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DELETE_VIDEO_CHANNEL_FAILURE,
      error
    };
  }
}
function deleteStarFromTemplate(templateId, starId) {
  return dispatch => {
    http
      .delete(
        `${appConfig.apiUrl}template/${templateId}/star-template/${starId}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(starId));
          toast.success("Deleted star from template");
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
    return {
      type: templateConstants.TEMPLATE_DELETE_STAR_SUCCESS,
      id
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DELETE_STAR_FAILURE,
      error
    };
  }
}
function starMarkForDelete(templateId, starId) {
  return dispatch => {
    http
      .delete(
        `${
          appConfig.apiUrl
        }template/${templateId}/star-template/${starId}/delete-star`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(starId));
          toast.success("Star deactivated successfully");
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
    return {
      type: templateConstants.TEMPLATE_MARK_FOR_DELETE_SUCCESS,
      id
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_DELETE_STAR_FAILURE,
      error
    };
  }
}
function starMarkForUnDelete(starId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}star/undelete/${starId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(starId));
          toast.success("Star activated successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(starId) {
    return {
      type: templateConstants.TEMPLATE_MARK_FOR_UNDELETE_SUCCESS,
      starId
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_MARK_FOR_DELETE_FAILURE,
      error
    };
  }
}
function addCastCrew(templateId, data) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}template/${templateId}/star-template`, data)
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

  function success(stars) {
    return { type: templateConstants.TEMPLATE_ADD_CAST_CREW_SUCCESS, stars };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_ADD_CAST_CREW_FAILURE, error };
  }
}
function getIvaImages(ivaId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/iva/movie/${ivaId}/image-urls`)
      .then(function(response) {
        if (response.data) {
          dispatch(success(response.data.data));
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
      });
  };

  function success(images) {
    return { type: templateConstants.TEMPLATE_GET_IVA_SUCCESS, images };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_IVA_FAILURE, error };
  }
}
function addIvaImagesToGallery(templateId, IvaId, data) {
  return dispatch => {
    http
      .post(
        `${appConfig.apiUrl}template/${templateId}/iva/movie/${IvaId}/gallery`,
        data
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("IVA Image  add to gallery successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(gallery) {
    return { type: templateConstants.TEMPLATE_ADD_IVA_IMAGES_SUCCESS, gallery };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_ADD_IVA_IMAGES_FAILURE, error };
  }
}
function templateSearch(mode, pageable, url) {
  if (pageable.verified) {
    delete pageable.newEntry;
    delete pageable.markForDelete;
  }
  if (pageable.newEntry) {
    delete pageable.markForDelete;
    delete pageable.verified;
  }
  if (pageable.markForDelete) {
    delete pageable.newEntry;
    delete pageable.verified;
  }

  return dispatch => {
    dispatch(request());
    Util.pageMode(mode, pageable);
    http
      .get(appConfig.apiUrl + "search/template/", {
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
    return { type: templateConstants.TEMPLATES_GETALL_REQUEST };
  }
  function success(templates) {
    return {
      type: templateConstants.TEMPLATES_GETALL_SUCCESS,
      templates,
      mode,
      url
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATES_GETALL_FAILURE, error };
  }
}
function updateStarInTemplate(templateId, starId, starInfo) {
  return dispatch => {
    http
      .put(
        `${appConfig.apiUrl}template/${templateId}/star-template/${starId}`,
        starInfo
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star updated successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star) {
    return {
      type: templateConstants.TEMPLATE_UPDATE_STAR_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_UPDATE_STAR_FAILURE,
      error
    };
  }
}
function mergeStars(data, oldstar) {
  return dispatch => {
    http
      .put(`${appConfig.apiUrl}star/merge`, data)

      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data, oldstar));
          toast.success("Star merged successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star, oldstar) {
    return { type: templateConstants.STAR_MERGE_SUCCESS, star, oldstar };
  }
  function failure(error) {
    return { type: templateConstants.STAR_MERGE_FAILURE, error };
  }
}
function imageInModal(value, link) {
  const gallerymodal = value;
  const mediaLink = link;

  if ((gallerymodal, mediaLink)) {
    return {
      type: templateConstants.TEMPLATE_GALLERY_MODAL_OPEN,
      gallerymodal,
      mediaLink
    };
  } else {
    return {
      type: templateConstants.TEMPLATE_GALLERY_MODAL_CLOSE,
      gallerymodal
    };
  }
}

function unDeleteStarFromTemplate(templateId, starId, starInfo) {
  return dispatch => {
    http
      .put(
        `${appConfig.apiUrl}template/${templateId}/star-template/${starId}`,
        starInfo
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Star restored successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star) {
    return {
      type: templateConstants.TEMPLATE_STAR_UN_DELETE_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_STAR_UN_DELETE_FAILURE,
      error
    };
  }
}
function getExtenalIds(Id) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/${Id}/externalds`)
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

  function success(ids) {
    return { type: templateConstants.TEMPLATE_GETEXTENAL_ID_SUCCESS, ids };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GETEXTENAL_ID_FAILURE, error };
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
      type: templateConstants.TEMPLATE_TAG_STARS_TO_VIDEO_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_TAG_STARS_TO_VIDEO_FAILURE,
      error
    };
  }
}
function taggedStars(videoId) {
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
    return { type: templateConstants.TEMPLATE_GET_TAGGED_STARS_SUCCESS, stars };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_TAGGED_STARS_FAILURE, error };
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
      type: templateConstants.TEMPLATE_TAG_STARS_TO_VIDEO_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_TAG_STARS_TO_VIDEO_FAILURE,
      error
    };
  }
}
function groupTemplate(templateId, childTemplateIds) {
  return dispatch => {
    http
      .post(
        `${appConfig.apiUrl}template/${templateId}/children`,
        childTemplateIds
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Template grouped successfully");
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(template) {
    return { type: templateConstants.TEMPLATE_GROUPING_SUCCESS, template };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GROUPING_FAILURE, error };
  }
}
function getGroupedTemplates(templateId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}template/${templateId}/children`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(templates) {
    return {
      type: templateConstants.TEMPLATE_GET_CHILD_TEMPLATES_SUCCESS,
      templates
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_GET_CHILD_TEMPLATES_FAILURE,
      error
    };
  }
}

function deleteGroupedTemplate(templateId, childTemplateId) {
  return dispatch => {
    http
      .delete(
        `${appConfig.apiUrl}template/${templateId}/children/${childTemplateId}`
      )
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(childTemplateId));
          toast.success("Template Deleted successfully");
        } else {
          dispatch(failure(childTemplateId));
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(id) {
    return {
      type: templateConstants.TEMPLATE_DELETE_CHILD_TEMPLATES_SUCCESS,
      id
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_DELETE_FAILURE, error };
  }
}
function updateStarsInTemplate(templateId, starInfo) {
  return dispatch => {
    http
      .put(`${appConfig.apiUrl}template/${templateId}/star-template`, starInfo)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Stars updated successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(star) {
    return {
      type: templateConstants.TEMPLATE_UPDATE_STAR_SUCCESS,
      star
    };
  }
  function failure(error) {
    return {
      type: templateConstants.TEMPLATE_UPDATE_STAR_FAILURE,
      error
    };
  }
}

function getCastRoles() {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}star/roles/cast`)
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

  function success(roles) {
    return {
      type: templateConstants.TEMPLATE_GET_CAST_ROLES_SUCCESS,
      roles
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_CAST_ROLES_FAILURE, error };
  }
}
function getCrewRoles() {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}star/roles/crew`)
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

  function success(roles) {
    return {
      type: templateConstants.TEMPLATE_GET_CREW_ROLES_SUCCESS,
      roles
    };
  }
  function failure(error) {
    return { type: templateConstants.TEMPLATE_GET_CREW_ROLES_FAILURE, error };
  }
}
