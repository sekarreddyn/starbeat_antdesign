import { registrationConstants } from "../constants";
const initialState = {
  countries: {
    data: [],
    loading: null
  },
  states: {
    data: [],
    loading: null
  },
  districts: {
    data: [],
    loading: null
  },
  upihandles: {
    data: [],
    loading: null
  },
  territories: {
    data: [],
    loading: null
  },
  garages: {
    data: [],
    loading: null
  },
  error: null
};
export function registration(state = initialState, action) {
  switch (action.type) {
    case registrationConstants.COUNTRIES_GET_REQUEST:
      return {
        ...state,
        countries: {
          ...state.countries,
          loading: true
        }
      };
    case registrationConstants.COUNTRIES_GET_SUCCESS:
      return {
        ...state,
        countries: {
          ...state.countries,
          data: action.countries.map(country => ({
            label: country.name,
            value: country.id
          })),
          loading: false
        }
      };
    case registrationConstants.COUNTRIES_GET_FAILURE:
      return {
        countries: {
          ...state.countries,
          loading: false
        }
      };
    case registrationConstants.STATES_GET_REQUEST:
      return {
        ...state,
        states: {
          ...state.states,
          loading: true
        }
      };
    case registrationConstants.STATES_GET_SUCCESS:
      return {
        ...state,
        states: {
          ...state.states,
          data: action.states.map(state => ({
            label: state.name,
            value: state.id
          })),
          loading: false
        }
      };
    case registrationConstants.STATES_GET_FAILURE:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false
        }
      };

    case registrationConstants.DISTRICTS_GET_REQUEST:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: true
        }
      };
    case registrationConstants.DISTRICTS_GET_SUCCESS:
      return {
        ...state,
        districts: {
          ...state.districts,
          data: action.districts.map(district => ({
            label: district.name,
            value: district.id
          })),
          loading: false
        }
      };
    case registrationConstants.DISTRICTS_GET_FAILURE:
      return {
        ...state,
        districts: {
          ...state.districts,
          loading: false
        }
      };
    case registrationConstants.UPI_HANDLES_GET_REQUEST:
      return {
        ...state,
        upihandles: {
          ...state.upihandles,
          loading: true
        }
      };
    case registrationConstants.UPI_HANDLES_GET_SUCCESS:
      return {
        ...state,
        upihandles: {
          ...state.upihandles,
          data: action.upihandles.map(upi => ({
            label: upi,
            value: upi
          })),
          loading: false
        }
      };
    case registrationConstants.UPI_HANDLES_GET_FAILURE:
      return {
        ...state,
        upihandles: {
          ...state.upihandles,
          loading: false
        }
      };
    case registrationConstants.TERRITORIES_GET_REQUEST:
      return {
        ...state,
        territories: {
          ...state.territories,
          loading: true
        }
      };
    case registrationConstants.TERRITORIES_GET_SUCCESS:
      return {
        ...state,
        territories: {
          ...state.territories,
          data: action.territories.map(territory => ({
            label: territory.name,
            value: territory.name
          })),
          loading: false
        }
      };
    case registrationConstants.TERRITORIES_GET_FAILURE:
      return {
        ...state,
        territories: {
          ...state.territories,
          loading: false
        }
      };
    case registrationConstants.GET_GARAGES_REQUEST:
      return {
        ...state,
        garages: {
          ...state.garages,
          loading: true
        }
      };
    case registrationConstants.GET_GARAGES_SUCCESS:
      return {
        ...state,
        garages: {
          ...state.garages,
          data: action.garages,
          loading: false
        }
      };
    case registrationConstants.GET_GARAGES_FAILURE:
      return {
        ...state,
        garages: {
          ...state.garages,
          loading: false
        }
      };
    case registrationConstants.CREATE_GARAGES_GET_REQUEST:
      return {
        ...state,
        garages: {
          ...state.garages,
          loading: true
        }
      };
    case registrationConstants.CREATE_GARAGES_GET_SUCCESS:
      return {
        ...state,
        garages: {
          ...state.garages,
          data: action.garage,
          loading: false
        }
      };
    case registrationConstants.CREATE_GARAGES_GET_FAILURE:
      return {
        ...state,
        garages: {
          ...state.garages,
          loading: false
        },
        error: action.error
      };
    default:
      return state;
  }
}
