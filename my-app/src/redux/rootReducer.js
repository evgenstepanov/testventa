import { combineReducers } from 'redux';
import { posts } from './reducers/posts';
import { user } from './reducers/user';
import menuIsHidden from './reducers/menuIsHidden';
import newPostForm from './reducers/newPostForm';
import visibilityFilter from './reducers/visibilityFilter';
import userInfo from './reducers/userInfo';
import usersList from './reducers/usersList';

export default combineReducers({
  user,
  posts,
  newPostForm,
  visibilityFilter,
  menuIsHidden,
  userInfo,
  usersList,
});
