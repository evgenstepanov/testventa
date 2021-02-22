import {
  REQUIRED_AUTHORIZATION,
  GET_USER,
  GET_USERS,
  UPDATE_ACCESS_USER,
  UPDATE_ACCESS_USERS_ON_SERVER,
  SET_USER_POSTS,
} from '../actionTypes';

function noop() {}

const initialState = {
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  name: null,
  surname: null,
  position: null,
  phone: null,
  patronymic: null,
  email: null,
  access: false,
  admin: false,
  users: [],
  accessUsers: [],
  userPosts: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_AUTHORIZATION:
      return {
        ...state,
        ...{
          userId: action.payload.userId,
          login: action.payload.login,
          logout: action.payload.logout,
          isAuthenticated: action.payload.isAuthenticated,
        },
      };
    case GET_USER:
      return {
        ...state,
        ...{
          name: action.payload.name,
          surname: action.payload.surname,
          position: action.payload.position,
          phone: action.payload.phone,
          patronymic: action.payload.patronymic,
          access: action.payload.access,
          email: action.payload.email,
          admin: action.payload.admin,
        },
      };
    case GET_USERS:
      return {
        ...state,
        ...{
          users: action.payload.user,
        },
      };
    case UPDATE_ACCESS_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.id) {
            return {
              ...user,
              access: action.payload.access,
            };
          }
          return user;
        }),
      };
    case UPDATE_ACCESS_USERS_ON_SERVER:
      return {
        ...state,
        accessUsers: action.payload,
      };
    case SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    default:
      return state;
  }
};

export { user };
