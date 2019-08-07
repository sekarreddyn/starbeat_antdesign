import { mistagConstants } from "../constants";
const initialState = {
  tags: {
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
  mistag: []
};
export function mistag(state = initialState, action) {
  switch (action.type) {
    case mistagConstants.TAG_OR_MISTAG_GETALL_REQUEST:
      return {
        loading: true
      };
    case mistagConstants.TAG_OR_MISTAG_GETALL_SUCCESS:
      return {
        ...state,
        tags: action.tags,
        url: action.url,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_GETALL_FAILURE:
      return {
        ...state,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_APPROVE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_APPROVE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_REJECT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_REJECT_FAILURE:
      return {
        ...state,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_GET_REQUEST:
      return {
        loading: true
      };
    case mistagConstants.TAG_OR_MISTAG_GET_SUCCESS:
      return {
        ...state,
        mistag: action.tags,
        loading: false
      };
    case mistagConstants.TAG_OR_MISTAG_GET_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
