import { SET_FILTER } from '../actionTypes';

const initialState = {
  development: true,
  design: true,
  search: '',
  reverse: true,
};

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;
