import { dashboardConstants } from "../constants";
const initialState = { collapsed: false };

export function dashboard(state = initialState, action) {
  switch (action.type) {
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
