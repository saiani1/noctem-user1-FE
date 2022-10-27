import React from 'react';

import Header from '../src/components/common/header';
import withAuth from '../src/components/common/withAuth';
import UserInfoContent from '../src/components/content/userInfoContent';

function userInfo() {
  return (
    <>
      <Header isClose={false} isBack />
      <UserInfoContent />
    </>
  );
}

export default withAuth(userInfo);
