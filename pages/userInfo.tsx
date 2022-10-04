import React from 'react';

import Header from '../src/components/common/header';
import UserInfoContent from '../src/components/content/userInfoContent';

function userInfo() {
  return (
    <>
      <Header isClose={false} isBack />
      <UserInfoContent />
    </>
  );
}

export default userInfo;
