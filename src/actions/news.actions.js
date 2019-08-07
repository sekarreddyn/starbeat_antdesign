import { newsConstants } from "../constants";
import { http, appConfig } from "../helpers";
import Util from "../components/Utilities/Util";
import { errorHandlerActions } from "../actions";
import { toast } from "react-toastify";
export const newsActions = {
  getAll,
  getNews,
  getRelatedNews,
  getNewsLead,
  getStarsRelatedNews,
  updateNews,
  uploadNewsProfileImage,
  markForDelete,
  markForUnDelete,
  deleteStar,
  addStarsToNews,
  addMoviesToNews,
  deleteTemplate
};

function getAll(mode, pageable) {
  delete pageable.verified;
  delete pageable.newEntry;
  delete pageable.markForDelete;
  delete pageable.approved;
  delete pageable.pending;

  if (mode.type === "newslead") {
    return dispatch => {
      dispatch(request());
      Util.pageMode(mode.type, pageable);
      http
        .get(appConfig.apiUrl + "newslead", {
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
  } else {
    return dispatch => {
      dispatch(request());
      Util.pageMode(mode.type, pageable);
      http
        .get(appConfig.apiUrl + "news", {
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
  }

  function request() {
    return { type: newsConstants.NEWS_GETALL_REQUEST };
  }
  function success(news) {
    return {
      type: newsConstants.NEWS_GETALL_SUCCESS,
      news,
      mode
    };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_GETALL_FAILURE, error };
  }
}
function getNews(newsId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}news/${newsId}`)
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

  function success(newsDetails) {
    return { type: newsConstants.NEWS_GET_SUCCESS, newsDetails };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_GET_FAILURE, error };
  }
}
function getRelatedNews(pageable, newsId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}news/${newsId}/related`, {
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

  function success(relatedNews) {
    return { type: newsConstants.NEWS_GET_RELATED_NEWS_SUCCESS, relatedNews };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_GET_RELATED_NEWS_FAILURE, error };
  }
}
function getStarsRelatedNews(pageable, newsId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}news/${newsId}/stars`, {
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

  function success(relatedStars) {
    return { type: newsConstants.NEWS_GET_RELATED_STAR_SUCCESS, relatedStars };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_GET_RELATED_STAR_FAILURE, error };
  }
}
function updateNews(news, newsleadId) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}news`, news)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("News Created successfully");
          const { id } = response.data.data;
          http
            .put(`${appConfig.apiUrl}newslead/${newsleadId}/news/${id}`)
            .then(function(response) {
              if (response.data.success) {
                toast.success("News updated successfully");
              }
            })
            .catch(function(error) {
              dispatch(failure(error));
            });
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error));
        dispatch(failure(error));
      });
  };

  function success(newsDetails) {
    return { type: newsConstants.NEWS_UPDATE_SUCCESS, newsDetails };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_UPDATE_FAILURE, error };
  }
}

function uploadNewsProfileImage(img, newsId) {
  const file = img;
  const formData = new FormData();
  formData.append("file", file);
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}news/${newsId}/profile/picture`, formData)
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
        dispatch(errorHandlerActions.handleHTTPError(error, newsId));
      });
  };

  function success(imageUrl) {
    return {
      type: newsConstants.NEWS_UPLOAD_PROFILE_IMAGE_SUCCESS,
      imageUrl
    };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_UPLOAD_PROFILE_IMAGE_FAILURE, error };
  }
}
function markForDelete(newsId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}news/${newsId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(newsId));
          toast.success("News deleted successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(newsId) {
    return { type: newsConstants.NEWS_MARKFORDELETE_SUCCESS, newsId };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_MARKFORDELETE_FAILURE, error };
  }
}
function markForUnDelete(newsId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}news/${newsId}/undelete`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(newsId));
          toast.success("News undeleted successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(newsId) {
    return { type: newsConstants.NEWS_MARKFORUNDELETE_SUCCESS, newsId };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_MARKFORUNDELETE_FAILURE, error };
  }
}
function getNewsLead(newsId) {
  return dispatch => {
    http
      .get(`${appConfig.apiUrl}newslead/${newsId}`)
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

  function success(newsDetails) {
    return { type: newsConstants.NEWS_GET_SUCCESS, newsDetails };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_GET_FAILURE, error };
  }
}
function deleteStar(newsId, starId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}news/${newsId}/star/${starId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(starId));
          toast.success("Star Deleted successfully");
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
    return { type: newsConstants.NEWS_STAR_DELETE_SUCCESS, starId };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_STAR_DELETE_FAILURE, error };
  }
}
function addStarsToNews(ids, newsId) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}news/${newsId}/stars`, ids)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Stars added successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error));
        dispatch(failure(error));
      });
  };

  function success(relatedStars) {
    return { type: newsConstants.NEWS_ADD_STAR_SUCCESS, relatedStars };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_ADD_STAR_FAILURE, error };
  }
}
function addMoviesToNews(newsId, ids) {
  return dispatch => {
    http
      .post(`${appConfig.apiUrl}news/${newsId}/template`, ids)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(response.data.data));
          toast.success("Movies added successfully");
        } else {
          dispatch(failure(response.data.reason));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error));
        dispatch(failure(error));
      });
  };

  function success(templates) {
    return { type: newsConstants.NEWS_ADD_TEMPLATE_SUCCESS, templates };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_ADD_TEMPLATE_FAILURE, error };
  }
}
function deleteTemplate(newsId, templateId) {
  return dispatch => {
    http
      .delete(`${appConfig.apiUrl}news/${newsId}/template/${templateId}`)
      .then(function(response) {
        if (response.data.success) {
          dispatch(success(templateId));
          toast.success("template Deleted successfully");
        } else {
          dispatch(failure());
        }
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(errorHandlerActions.handleHTTPError(error));
      });
  };

  function success(templateId) {
    return { type: newsConstants.NEWS_TEMPLATE_DELETE_SUCCESS, templateId };
  }
  function failure(error) {
    return { type: newsConstants.NEWS_TEMPLATE_DELETE_FAILURE, error };
  }
}
