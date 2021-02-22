import { ADD_POST, GET_POSTS } from '../actionTypes';

const initialState = [];

export function posts(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        {
          numberOfWeek: action.payload.numberOfWeek,
          firstDayOfWeek: action.payload.firstDayOfWeek,
          _id: action.payload._id,
          userId: action.payload.userId,
          date: action.payload.date,
          person: action.payload.person,
          position: action.payload.position,
          report: action.payload.report,
          plans: action.payload.plans,
        },
      ];
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
}
