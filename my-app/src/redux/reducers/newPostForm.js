/* eslint-disable func-names */
import { TOGGLE_NEW_POST_FORM } from '../actionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NEW_POST_FORM: {
      return !state;
    }
    default:
      return state;
  }
}
