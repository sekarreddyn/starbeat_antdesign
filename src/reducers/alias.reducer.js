import { aliasConstants } from "../constants";
const initialState = {
  alias: {
    list: {
      data: [],
      loading: null
    },
    create: {
      loading: null
    },
    delete_alias: {
      loading: null,
      id: ""
    },
    update_alias: {
      loading: null
    }
  }
};
export function alias(state = initialState, action) {
  switch (action.type) {
    case aliasConstants.GET_ALIAS_REQUEST:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            loading: true
          }
        }
      };
    case aliasConstants.GET_ALIAS_SUCCESS:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            data: action.alias,
            loading: false
          }
        }
      };
    case aliasConstants.GET_ALIAS_FAILURE:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            loading: true
          }
        }
      };
    case aliasConstants.CREATE_ALIAS_REQUEST:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list
          },
          create: {
            loading: true
          }
        }
      };
    case aliasConstants.CREATE_ALIAS_SUCCESS:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            data: state.alias.list.data.concat(action.alias)
          },
          create: {
            loading: false
          }
        }
      };
    case aliasConstants.CREATE_ALIAS_FAILURE:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            data: state.alias.list.data.concat(action.alias)
          },
          create: {
            loading: false
          }
        }
      };
    case aliasConstants.DELETE_ALIAS_REQUEST:
      return {
        ...state,
        alias: {
          ...state.alias,
          delete_alias: {
            loading: true,
            id: action.id
          }
        }
      };
    case aliasConstants.DELETE_ALIAS_SUCCESS:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            data: state.alias.list.data.filter(alias => alias.id !== action.id)
          },
          delete_alias: {
            loading: false,
            id: action.id
          }
        }
      };
    case aliasConstants.DELETE_ALIAS_FAILURE:
      return {
        ...state,
        alias: {
          ...state.alias,
          delete_alias: {
            loading: false
          }
        }
      };
    case aliasConstants.UPDATE_ALIAS_REQUEST:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list
          },
          update_alias: {
            loading: true
          }
        }
      };
    case aliasConstants.UPDATE_ALIAS_SUCCESS:
      return {
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list,
            data: state.alias.list.data.map(alias =>
              alias.id === action.alias.id ? action.alias : alias
            )
          },
          update_alias: {
            loading: false
          }
        }
      };
    case aliasConstants.UPDATE_ALIAS_FAILURE:
      return {
        ...state,
        alias: {
          ...state.alias,
          list: {
            ...state.alias.list
          },
          update_alias: {
            loading: false
          }
        }
      };

    default:
      return state;
  }
}
