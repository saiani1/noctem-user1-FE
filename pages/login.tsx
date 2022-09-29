import React from 'react';
import Header from '../src/components/common/header';
import LoginContent from '../src/components/content/loginContent';

function login() {
  return (
    <>
      <Header isClose={false} />
      <LoginContent />
    </>
  );
}

export default login;
