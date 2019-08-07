import { registrationConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { errorHandlerActions } from ".";
import { toast } from "react-toastify";

export const registrationActions = {
  getCountries,
  getStates,
  getDistricts,
  getUpiHandles,
  getTerritories,
  createGarage,
  getGarages
};

function getCountries() {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "countries")
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error.response));
      });
  };

  function request() {
    return { type: registrationConstants.COUNTRIES_GET_REQUEST };
  }
  function success(countries) {
    return { type: registrationConstants.COUNTRIES_GET_SUCCESS, countries };
  }
  function failure(error) {
    return { type: registrationConstants.COUNTRIES_GET_FAILURE, error };
  }
}
function getStates(country) {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "states", {
        params: {
          country: country.value
        }
      })
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error.response));
      });
  };

  function request() {
    return { type: registrationConstants.STATES_GET_REQUEST };
  }
  function success(states) {
    return { type: registrationConstants.STATES_GET_SUCCESS, states };
  }
  function failure(error) {
    return { type: registrationConstants.STATES_GET_FAILURE, error };
  }
}

function getDistricts(value) {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "districts", {
        params: {
          state: value
        }
      })
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error.response));
      });
  };

  function request() {
    return { type: registrationConstants.DISTRICTS_GET_REQUEST };
  }
  function success(districts) {
    return { type: registrationConstants.DISTRICTS_GET_SUCCESS, districts };
  }
  function failure(error) {
    return { type: registrationConstants.DISTRICTS_GET_FAILURE, error };
  }
}
function getUpiHandles() {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "payments/upi-handles")
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error.response));
      });
  };

  function request() {
    return { type: registrationConstants.UPI_HANDLES_GET_REQUEST };
  }
  function success(upihandles) {
    return { type: registrationConstants.UPI_HANDLES_GET_SUCCESS, upihandles };
  }
  function failure(error) {
    return { type: registrationConstants.UPI_HANDLES_GET_FAILURE, error };
  }
}
function getTerritories() {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "territories")
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(errorHandlerActions.handleHTTPError(error.response));
      });
  };

  function request() {
    return { type: registrationConstants.TERRITORIES_GET_REQUEST };
  }
  function success(territories) {
    return { type: registrationConstants.TERRITORIES_GET_SUCCESS, territories };
  }
  function failure(error) {
    return { type: registrationConstants.TERRITORIES_GET_FAILURE, error };
  }
}

function createGarage(data) {
  return dispatch => {
    dispatch(request());
    http
      .post(appConfig.apiUrl + "customers", data)
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
          toast.success("Garage created successfully!");
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        dispatch(failure(error.response.data));
      });
  };

  function request() {
    return { type: registrationConstants.CREATE_GARAGES_GET_REQUEST };
  }
  function success(garage) {
    return { type: registrationConstants.CREATE_GARAGES_GET_SUCCESS, garage };
  }
  function failure(error) {
    return { type: registrationConstants.CREATE_GARAGES_GET_FAILURE, error };
  }
}
function getGarages() {
  return dispatch => {
    dispatch(request());
    http
      .get(appConfig.apiUrl + "customers")
      .then(function(response) {
        if (response.status === 200) {
          dispatch(success(response.data));
        } else {
          dispatch(failure(response.data));
        }
      })
      .catch(function(error) {
        // dispatch(errorHandlerActions.handleHTTPError(error.response));
        alert(error);
      });
  };

  function request() {
    return { type: registrationConstants.GET_GARAGES_REQUEST };
  }
  function success(garages) {
    return { type: registrationConstants.GET_GARAGES_SUCCESS, garages };
  }
  function failure(error) {
    return { type: registrationConstants.GET_GARAGES_FAILURE, error };
  }
}
