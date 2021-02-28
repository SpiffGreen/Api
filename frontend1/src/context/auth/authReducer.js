import {
  IS_AUTHENTICATED,
  SET_AUTHENTICATED,
} from "../types";

const authReducer = (state, action) => {
  switch(action.type) {
    case IS_AUTHENTICATED:
      return state;
    case SET_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;