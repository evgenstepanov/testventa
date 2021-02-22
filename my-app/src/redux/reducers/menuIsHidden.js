/* eslint-disable func-names */
import { TOGGLE_MENU_IS_HIDDEN } from '../actionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU_IS_HIDDEN: {
      return !state;
    }
    default:
      return state;
  }
}
