import {
  SET_CURRENT_USER,
  SET_CURRENT_IP,
  REMOVE_CURRENT_USER,
  SET_USER_NAME,
} from "../constants/action-types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  ip: null,
};

export default (state = initialState, action = {}) => {
  if (action.type === SET_CURRENT_USER) {
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload,
    };
  }
  if (action.type === REMOVE_CURRENT_USER) {
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: {},
    };
  }
  if (action.type === SET_CURRENT_IP) {
    return {
      ...state,
      ip: action.payload,
    };
  }
  if (action.type === SET_USER_NAME) {
    return {
      ...state,
      user: {
        ...state.user,
        name: action.payload,
      },
    };
  }
  return state;
};
