import { approvalConstants } from "../constants";
const initialState = {
  approvals: {
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

export function approval(state = initialState, action) {
  switch (action.type) {
    case approvalConstants.APPROVAL_GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        approvals: {
          ...state.approvals,
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
          loading: true
        }
      };
    case approvalConstants.APPROVAL_GETALL_SUCCESS:
      return {
        ...state,
        approvals: {
          ...state.approvals,
          list: action.approvals,
          loading: false
        }
      };
    case approvalConstants.APPROVAL_GETALL_FAILURE:
      return {
        ...state,
        approvals: {
          ...state.approvals,
          loading: false
        }
      };
    case approvalConstants.APPROVAL_APPROVE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case approvalConstants.APPROVAL_APPROVE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case approvalConstants.APPROVAL_REJECT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case approvalConstants.APPROVAL_REJECT_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
