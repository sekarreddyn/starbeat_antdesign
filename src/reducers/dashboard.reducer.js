import { dashboardConstants } from "../constants";
const initialState = {
  starsCount: {
    NEW: null,
    PENDING: null,
    APPROVED: null,
    DELETED: null,
    loading: null
  },
  templatesCount: {
    NEW: null,
    PENDING: null,
    APPROVED: null,
    DELETED: null,
    loading: null
  },
  starCategories: {
    count: null,
    loading: null
  },
  movieCategories: {
    count: null,
    loading: null
  },
  activityList: [],
  activities: {
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
  collapsed: false
};
export function dashboard(state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.STAR_COUNT_GET_REQUEST:
      return {
        ...state,
        starsCount: {
          ...state.starsCount,
          loading: true
        }
      };
    case dashboardConstants.STAR_COUNT_GET_SUCCESS:
      return {
        ...state,
        starsCount: { ...action.counts, loading: false }
      };
    case dashboardConstants.STAR_COUNT_GET_FAILURE:
      return {
        ...state,
        starsCount: {
          ...state.starsCount,
          loading: false
        }
      };
    case dashboardConstants.TEMPLATE_COUNT_GET_REQUEST:
      return {
        ...state,
        templatesCount: {
          ...state.templatesCount,
          loading: true
        }
      };
    case dashboardConstants.TEMPLATE_COUNT_GET_SUCCESS:
      return {
        ...state,
        templatesCount: { ...action.counts, loading: false }
      };
    case dashboardConstants.TEMPLATE_COUNT_GET_FAILURE:
      return {
        ...state,
        templatesCount: {
          ...state.templatesCount,
          loading: false
        }
      };
    case dashboardConstants.ACTIVITY_GETALL_REQUEST:
      return {
        ...state,
        activities: { ...state.activities, loading: true }
      };
    case dashboardConstants.ACTIVITY_GETALL_SUCCESS:
      return {
        ...state,
        activities: {
          ...state.activities,
          list: action.activities,
          loading: false
        },
        activityList: action.activities
      };
    case dashboardConstants.ACTIVITY_GETALL_FAILURE:
      return {
        ...state,
        activities: {
          ...state.activities,
          loading: false
        }
      };
    case dashboardConstants.STAR_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        starCategories: {
          ...state.starCategories,
          loading: true
        }
      };
    case dashboardConstants.STAR_CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        starCategories: {
          count: action.categories.length,
          loading: false
        }
      };
    case dashboardConstants.STAR_CATEGORIES_GET_FAILURE:
      return {
        ...state,
        starCategories: {
          ...state.starCategories,
          loading: false
        }
      };
    case dashboardConstants.TEMPLATE_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        movieCategories: {
          ...state.movieCategories,
          loading: true
        }
      };
    case dashboardConstants.TEMPLATE_CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        movieCategories: {
          count: action.categories.length,
          loading: false
        }
      };
    case dashboardConstants.TEMPLATE_CATEGORIES_GET_FAILURE:
      return {
        ...state,
        movieCategories: {
          ...state.movieCategories,
          loading: false
        }
      };
    case dashboardConstants.SIDEMENU_OPEN_HANDLE:
      return {
        ...state,
        collapsed: action.isOpen
      };
    case dashboardConstants.SIDEMENU_CLOSE_HANDLE:
      return {
        ...state,
        collapsed: action.isOpen
      };

    default:
      return state;
  }
}
