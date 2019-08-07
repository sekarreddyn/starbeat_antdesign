import { userConstants } from "../constants";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.USERS_GETALL_REQUEST:
      return {
        ...state
      };
    case userConstants.USERS_GETALL_SUCCESS:
      return {
        ...state,
        usersList: action.usersList
      };
    case userConstants.USERS_GETALL_FAILURE:
      return {
        ...state,
        usersList: {}
      };
    case userConstants.USER_UPDATE_SUCCESS:
      return {
        ...state,
        usersList: {
          content: state.usersList.content.map(user =>
            user.id === action.user.id ? action.user : user
          )
        },
        loading: false,
        date: new Date().getTime()
      };
    case userConstants.USER_DELETE_SUCCESS:
      return {
        ...state,
        usersList: {
          content: state.usersList.content.filter(
            user => user.id !== action.user.id
          )
        }
      };
    case userConstants.USER_DELETE_FAILURE:
      return {
        ...state
      };

    case userConstants.USER_CHANGEPASSWORD_SUCCESS:
      return {
        ...state
      };
    case userConstants.USER_CHANGEPASSWORD_FAILURE:
      return {
        ...state
      };
    case userConstants.USER_ADD_SUCCESS:
      return {
        ...state,
        usersList: {
          content: state.usersList.content.concat(action.user)
        },
        loading: false,
        date: new Date().getTime()
      };
    case userConstants.USER_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        date: new Date().getTime()
      };
    default:
      return state;
  }
}
