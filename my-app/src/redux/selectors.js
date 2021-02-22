// eslint-disable-next-line no-unused-vars

import { Positions } from '../constants';

export const getPostsBySearch = (posts, visibilityFilter) => {
  switch (true) {
    case visibilityFilter.search !== '':
      return posts.filter(
        (post) =>
          post.plans.includes(visibilityFilter.search) ||
          post.report.includes(visibilityFilter.search)
      );
    default:
      return posts;
  }
};

export const getPostsByPosition = (posts, visibilityFilter) => {
  const currentPosts = getPostsBySearch(posts, visibilityFilter);
  switch (true) {
    case !visibilityFilter.development && !visibilityFilter.design:
      return [];
    case visibilityFilter.development && !visibilityFilter.design:
      return currentPosts.filter(
        (post) => post.position === Positions.DEVELOPER
      );
    case !visibilityFilter.development && visibilityFilter.design:
      return currentPosts.filter(
        (post) => post.position === Positions.DESIGNER
      );
    default:
      return currentPosts;
  }
};
