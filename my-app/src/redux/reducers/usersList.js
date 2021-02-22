/* eslint-disable func-names */
import { TOGGLE_USERS_LIST } from '../actionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_USERS_LIST: {
      return !state;
    }
    default:
      return state;
  }
}
