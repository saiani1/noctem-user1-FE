/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Header from '../src/components/common/header';
import MyPageContent from '../src/components/content/myPageContent';

function myPage() {
  return (
    <>
      <Header isClose={false} />
      <MyPageContent />
    </>
  );
}

export default myPage;
