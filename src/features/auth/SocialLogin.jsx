import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { socialLogin } from '../../app/firestore/firebaseService';

const SocialLogin = () => {
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }
  return (
    <>
      <Button
        onClick={() => handleSocialLogin('facebook')}
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content="Sign in with Facebook"
      />
      <Button
        onClick={() => handleSocialLogin('google')}
        icon="google"
        fluid
        color="google plus"
        content="Sign in with Google"
      />
    </>
  );
};

export default SocialLogin;
