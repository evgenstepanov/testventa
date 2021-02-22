/* eslint-disable func-names */
import { TOGGLE_USER_INFO } from '../actionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_USER_INFO: {
      return !state;
    }
    default:
      return state;
  }
}
