import React from 'react';

import Header from '../src/components/common/header';
import SignUpContent from '../src/components/content/signUpContent';

function index() {
  return (
    <>
      <Header isClose isBack={false} />
      <SignUpContent />
    </>
  );
}

export default index;
