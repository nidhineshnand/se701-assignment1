import { trackPromise } from 'react-promise-tracker';
import {
  upvotePostRoute,
  getPostsRoute,
  getSubthreadersRoute,
  getPostsForSubthreadRoute,
} from './apiRoutes';

export const getPosts = async () => {
  const response = await trackPromise(fetch(getPostsRoute).then(respose => respose.json()));
  return response;
};

export const getSubthreaders = async () => {
  const response = await trackPromise(fetch(getSubthreadersRoute).then(res => res.json()));
  return response;
};

export const getPostsForSubthread = async thread => {
  const response = await trackPromise(
    fetch(getPostsForSubthreadRoute(thread)).then(res => res.json()),
  );
  return response;
};
// eslint-disable-next-line camelcase
export const handleVote = async ({ id, upvote_type, upvote }) => {
  const params = {
    id,
    upvote_type,
    upvote,
  };

  const requestBody = JSON.stringify(params);

  const response = await fetch(upvotePostRoute(id), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'PUT',
    body: requestBody,
  })
    .then(responseBody => responseBody.json())
    // eslint-disable-next-line no-unused-vars
    .catch(error => {});

  if (response) {
    if (response.message) {
      // eslint-disable-next-line no-console
      console.log(response.message);
    }
  }
};
