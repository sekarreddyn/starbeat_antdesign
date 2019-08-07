import { dashboardConstants } from "../constants";

export const dashboardActions = {
  openCloseSidemenu
};

function openCloseSidemenu(isOpen) {
  if (isOpen) {
    return {
      type: dashboardConstants.SIDEMENU_OPEN_HANDLE,
      isOpen
    };
  } else {
    return {
      type: dashboardConstants.SIDEMENU_CLOSE_HANDLE,
      isOpen
    };
  }
}
