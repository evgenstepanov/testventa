import {
  REQUIRED_AUTHORIZATION,
  ADD_POST,
  SET_FILTER,
  TOGGLE_NEW_POST_FORM,
  GET_USER,
  GET_POSTS,
  GET_USERS,
  TOGGLE_MENU_IS_HIDDEN,
  TOGGLE_USER_INFO,
  TOGGLE_USERS_LIST,
  UPDATE_ACCESS_USER,
  UPDATE_ACCESS_USERS_ON_SERVER,
  SET_USER_POSTS,
} from './actionTypes';
import { getPostsThisUser } from '../utlis';

export const requireAuthorization = (user) => ({
  type: REQUIRED_AUTHORIZATION,
  payload: user,
});

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

export function getPosts() {
  return async (dispatch) => {
    const response = await fetch('/api/posts/get');
    const json = await response.json();
    dispatch({ type: GET_POSTS, payload: json });
  };
}

export function getUsers() {
  return async (dispatch) => {
    const response = await fetch('/api/auth/get');
    const json = await response.json();
    dispatch({ type: GET_USERS, payload: json });
  };
}

export function getUserData(userId) {
  return async (dispatch) => {
    const response = await fetch(`/api/auth/${userId}`);
    const json = await response.json();
    dispatch({ type: GET_USER, payload: json });
  };
}
export const setUserData = (user) => ({ type: GET_USER, payload: user });

export const setUserAccess = (access, id) => ({
  type: UPDATE_ACCESS_USER,
  payload: { access, id },
});

export const setUsersAccessOnServer = (users) => ({
  type: UPDATE_ACCESS_USERS_ON_SERVER,
  payload: users,
});

export const setUserPosts = (posts, user) => {
  const userPosts = getPostsThisUser(posts, user);
  return { type: SET_USER_POSTS, payload: userPosts };
};

export const toogleNewPostForm = () => ({ type: TOGGLE_NEW_POST_FORM });

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter },
});

export const hideMenu = () => ({
  type: TOGGLE_MENU_IS_HIDDEN,
});

export const toggleUserInfo = () => ({
  type: TOGGLE_USER_INFO,
});

export const toogleUsersList = () => ({
  type: TOGGLE_USERS_LIST,
});
