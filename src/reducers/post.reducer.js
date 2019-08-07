import { postConstants } from "../constants";
const initialState = {
  post: {
    list: {
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 0,
      sort: [],
      totalElements: 0,
      totalPages: 1
    },
    loading: null,
    post: {
      data: { id: "" },
      loading: null
    }
  },
  gallery: {
    list: {
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 0,
      sort: [],
      totalElements: 0,
      totalPages: 1
    },
    loading: null
  }
};

export function post(state = initialState, action) {
  switch (action.type) {
    case postConstants.POST_GET_INI_STATE:
      return {
        ...state
      };
    case postConstants.POST_GETALL_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          list: {
            ...state.post.list,
            content: []
          },
          loading: true
        }
      };
    case postConstants.POST_GETALL_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          list: action.post,
          loading: false
        }
      };
    case postConstants.POST_GETALL_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          loading: false
        }
      };
    case postConstants.POST_GET_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            loading: true
          }
        }
      };
    case postConstants.POST_GET_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            data: action.postDetails,
            loading: false
          }
        }
      };
    case postConstants.POST_GET_FAILURE:
      return {
        ...state
      };
    case postConstants.POST_ADD_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            loading: true
          }
        }
      };
    case postConstants.POST_ADD_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            data: action.postDetails,
            loading: false
          }
        }
      };
    case postConstants.POST_ADD_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            loading: false
          }
        }
      };
    case postConstants.POST_UPLOAD_BANNER_IMAGE_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            loading: true
          }
        }
      };
    case postConstants.POST_UPLOAD_BANNER_IMAGE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            data: {
              ...state.post.post.data,
              bannerImageLocation: action.bannerImageLocation
            },
            loading: false
          }
        }
      };
    case postConstants.POST_UPLOAD_BANNER_IMAGE_FAILURE:
      return {
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            loading: false
          }
        }
      };
    case postConstants.POST_MARKFORDELETE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          content: state.post.content.filter(post => post.id !== action.id),
          numberOfElements: state.post.numberOfElements - 1,
          totalElements: state.post.totalElements - 1
        }
      };
    case postConstants.POST_MARKFORDELETE_FAILURE:
      return {
        ...state
      };
    case postConstants.POST_GET_GALLERY_REQUEST:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          loading: true
        }
      };
    case postConstants.POST_GET_GALLERY_SUCCESS:
      return {
        ...state,
        gallery: {
          list: action.gallery,
          loading: false
        }
      };
    case postConstants.POST_GET_GALLERY_FAILURE:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          loading: false
        }
      };
    case postConstants.POST_UPLOAD_GALLERY_SUCCESS:
      return {
        ...state,
        postDetails: {
          ...state.postDetails,
          loading: false
        }
      };
    case postConstants.POST_UPLOAD_GALLERY_FAILURE:
      return {
        ...state,
        loading: false
      };

    case postConstants.POST_GALLERY_MODAL_OPEN:
      return {
        ...state,
        gallerymodal: action.gallerymodal,
        galleryMediaLink: action.mediaLink
      };
    case postConstants.POST_GALLERY_MODAL_CLOSE:
      return {
        ...state,
        gallerymodal: action.gallerymodal,
        galleryMediaLink: null
      };
    case postConstants.POST_STAR_DELETE_SUCCESS:
      return {
        ...state,
        postDetails: action.postDetails
      };
    case postConstants.POST_STAR_DELETE_FAILURE:
      return {
        ...state
      };
    case postConstants.POST_UPDATE_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            loading: true
          }
        }
      };
    case postConstants.POST_UPDATE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            data: action.postDetails,
            loading: false
          }
        }
      };
    case postConstants.POST_UPDATE_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
