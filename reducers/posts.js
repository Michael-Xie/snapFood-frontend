/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
const findPostIndex = (state, id) => {
  let i = 0;
  while (i < state.length) {
    if (state[i].id === id) {
      return i;
    }
    i++;
  }
  return -1;
};
const updatePostWhenLiked = (posts, id, liked, disliked) => {
  const postIndex = findPostIndex(posts, id);
  const post = posts[postIndex];
  if (liked) {
    post.userLikedPost = false;
    post.likes -= 1;
  } else if (disliked) {
    post.userDislikedPost = false;
    post.userLikedPost = true;
    post.likes += 1;
    post.dislikes -= 1;
  } else {
    post.userLikedPost = true;
    post.likes += 1;
  }

  posts.splice(postIndex, 1, post);
  return [...posts];
};

const updatePostWhenDisliked = (posts, id, liked, disliked) => {
  const postIndex = findPostIndex(posts, id);
  const post = posts[postIndex];

  if (disliked) {
    post.userDislikedPost = false;
    post.dislikes -= 1;
  } else if (liked) {
    post.userDislikedPost = true;
    post.userLikedPost = false;
    post.likes -= 1;
    post.dislikes += 1;
  } else {
    post.userDislikedPost = true;
    post.dislikes += 1;
  }

  posts.splice(postIndex, 1, post);
  return [...posts];
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts;
    case 'UPDATE_LIKE':
      return updatePostWhenLiked(state, action.id, action.liked, action.disliked);
    case 'UPDATE_DISLIKE':
      return updatePostWhenDisliked(state, action.id, action.liked, action.disliked);
    default:
      throw new Error();
  }
};

export default reducer;
