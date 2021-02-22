/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Header from './Header';
import './Dashboard.css';
import NewReportForm from './NewReportForm';
import WeekBlock from './WeekBlock';
import AddPostBtn from './AddPostBtn';
import Menu from './Menu';
import UserInfo from './UserInfo';
import UsersList from './UsersList/UsersList';
import { getPostsByPosition } from '../../redux/selectors';
import { getPosts, getUserData, setUserPosts } from '../../redux/actions';

function Dashboard({
  newPostForm,
  filteredPosts,
  visibilityFilter,
  getPosts,
  getUserData,
  user,
  userInfo,
  usersList,
  posts,
  setUserPosts,
}) {
  const postsByWeeks = Object.values(_.groupBy(filteredPosts, 'numberOfWeek'));
  const weeksInOrder = visibilityFilter.reverse
    ? postsByWeeks.reverse()
    : postsByWeeks;

  useEffect(() => {
    getUserData(user.userId);
  }, [user.userId]);

  useEffect(() => {
    setUserPosts(posts, user);
  }, [posts]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {userInfo ? <UserInfo /> : null}
      {usersList ? <UsersList /> : null}
      <div className="dashboard">
        <div className="posts-container">
          <div className="side-btn-container">
            <AddPostBtn />
            <Menu />
          </div>
          <Header />
          {newPostForm ? <NewReportForm /> : null}
          {filteredPosts.length
            ? // eslint-disable-next-line array-callback-return
              weeksInOrder.map((week, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <WeekBlock week={week} key={i} />
              ))
            : null}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    visibilityFilter,
    posts,
    newPostForm,
    user,
    userInfo,
    usersList,
  } = state;
  const filteredPosts = getPostsByPosition(posts, visibilityFilter);
  return {
    filteredPosts,
    newPostForm,
    visibilityFilter,
    user,
    userInfo,
    usersList,
    posts,
  };
};

export default connect(mapStateToProps, {
  getPosts,
  getUserData,
  setUserPosts,
})(Dashboard);
