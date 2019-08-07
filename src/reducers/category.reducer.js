import { categoryConstants } from "../constants";
const initialState = {
  categories: {
    list: [],
    loading: null,
    url: ""
  }
};

export function category(state = initialState, action) {
  switch (action.type) {
    case categoryConstants.CATEGORIES_GETALL_REQUEST:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true
        }
      };
    case categoryConstants.CATEGORIES_GETALL_SUCCESS:
      return {
        ...state,
        categories: {
          list: action.categories,
          loading: false,
          url: action.url
        }
      };
    case categoryConstants.CATEGORIES_GETALL_FAILURE:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false
        }
      };
    case categoryConstants.CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          list: state.categories.list.filter(
            category => category.id !== action.category.id
          )
        }
      };
    case categoryConstants.CATEGORY_DELETE_FAILURE:
      return {
        ...state
      };
    case categoryConstants.CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          list: state.categories.list.concat(action.category)
        }
      };
    case categoryConstants.CATEGORY_ADD_FAILURE:
      return {
        ...state
      };
    case categoryConstants.CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          list: state.categories.list.map(category =>
            category.id === action.categoryId ? action.category : category
          )
        }
      };
    case categoryConstants.CATEGORY_UPDATE_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
}
