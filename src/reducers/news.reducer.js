import { newsConstants } from "../constants";
const initialState = {
  news: {
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
  },
  relatedStars: {
    content: [],
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    sort: [],
    totalElements: 0,
    totalPages: 1
  }
};
export function news(state = initialState, action) {
  switch (action.type) {
    case newsConstants.NEWS_GETALL_REQUEST:
      return {
        ...state,
        news: {
          ...state.news,
          loading: true
        }
      };
    case newsConstants.NEWS_GETALL_SUCCESS:
      return {
        ...state,
        news: {
          ...state.news,
          list: action.news,
          loading: false
        },

        url: action.url
      };
    case newsConstants.NEWS_GETALL_FAILURE:
      return {
        ...state,
        news: {
          ...state.news,
          loading: false
        }
      };
    case newsConstants.NEWS_GET_SUCCESS:
      return {
        ...state,
        newsDetails: action.newsDetails
      };
    case newsConstants.NEWS_GET_FAILURE:
      return {
        ...state,
        news: {}
      };
    case newsConstants.NEWS_GET_RELATED_NEWS_SUCCESS:
      return {
        ...state,
        relatedNews: action.relatedNews
      };
    case newsConstants.NEWS_GET_RELATED_NEWS_FAILURE:
      return {
        ...state,
        news: {}
      };
    case newsConstants.NEWS_GET_RELATED_STAR_SUCCESS:
      return {
        ...state,
        relatedStars: action.relatedStars
      };
    case newsConstants.NEWS_GET_RELATED_STAR_FAILURE:
      return {
        ...state,
        news: {}
      };
    case newsConstants.NEWS_UPDATE_SUCCESS:
      return {
        ...state,
        newsDetails: action.newsDetails,
        loading: false
      };
    case newsConstants.NEWS_UPDATE_FAILURE:
      return {
        ...state,
        news: {},
        loading: false
      };
    case newsConstants.NEWS_UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        newsDetails: {
          ...state.newsDetails,
          imageUrl: action.imageUrl
        },
        loading: false
      };
    case newsConstants.NEWS_UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        newsDetails: {
          ...state.newsDetails
        },
        loading: false
      };
    case newsConstants.NEWS_MARKFORDELETE_SUCCESS:
      return {
        ...state,
        news: {
          content: state.news.content.filter(item => item.id !== action.newsId)
        }
      };
    case newsConstants.NEWS_MARKFORDELETE_FAILURE:
      return {
        ...state
      };
    case newsConstants.NEWS_MARKFORUNDELETE_SUCCESS:
      return {
        ...state,
        news: {
          content: state.news.content.filter(item => item.id !== action.newsId)
        }
      };
    case newsConstants.NEWS_MARKFORUNDELETE_FAILURE:
      return {
        ...state
      };
    case newsConstants.NEWS_STAR_DELETE_SUCCESS:
      return {
        ...state,
        relatedStars: {
          ...state.relatedStars,
          content: state.relatedStars.content.filter(
            item => item.id !== action.starId
          ),
          numberOfElements: state.relatedStars.numberOfElements - 1,
          size: state.relatedStars.size - 1,
          totalElements: state.relatedStars.totalElements - 1
        }
      };
    case newsConstants.NEWS_STAR_DELETE_FAILURE:
      return {
        ...state
      };
    case newsConstants.NEWS_ADD_STAR_SUCCESS:
      return {
        ...state,
        relatedStars: {
          ...state.relatedStars,
          content: state.relatedStars.content.concat(action.relatedStars),
          numberOfElements:
            state.relatedStars.numberOfElements + action.relatedStars.length,
          size: state.relatedStars.size + action.relatedStars.length,
          totalElements:
            state.relatedStars.totalElements + action.relatedStars.length
        }
      };
    case newsConstants.NEWS_ADD_STAR_FAILURE:
      return {
        ...state
      };
    case newsConstants.NEWS_ADD_TEMPLATE_SUCCESS:
      return {
        ...state,
        newsDetails: {
          ...state.newsDetails,
          templates: [...action.templates, ...state.newsDetails.templates]
        }
      };
    case newsConstants.NEWS_ADD_TEMPLATE_FAILURE:
      return {
        ...state
      };
    case newsConstants.NEWS_TEMPLATE_DELETE_SUCCESS:
      return {
        ...state,
        newsDetails: {
          ...state.newsDetails,
          templates: state.newsDetails.templates.filter(
            item => item.id !== action.templateId
          )
        }
      };
    case newsConstants.NEWS_TEMPLATE_DELETE_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
}
