import React, { useState } from 'react';

import submitPost, { SubmitPostError } from '../../../services/createPostService';

export const createNewSubthreadService = submit => CreatePost => ({
  showModal,
  setModal,
  retrievedSubthreaders,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async title => {
    try {
      await submit(title);
      setErrorMessage(null);
      setModal(false);
    } catch (error) {
      if (!(error instanceof SubmitPostError)) {
        setErrorMessage('Could not submit post. Please try again.');
        // eslint-disable-next-line no-console
        console.error(error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleClose = () => {
    setErrorMessage('');
    setModal(false);
  };

  return (
    <>
      <CreatePost
        showModal={showModal}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onClose={handleClose}
        retrievedSubthreaders={retrievedSubthreaders}
      />
    </>
  );
};

export default createNewSubthreadService(submitPost);