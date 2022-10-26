import React from 'react';

import Header from '../src/components/common/header';
import withAuth from '../src/components/common/withAuth';
import MyMenuContent from '../src/components/content/myMenuContent';

function MyMenu() {
  return (
    <>
      <Header isClose={false} isBack />
      <MyMenuContent />
    </>
  );
}

export default withAuth(MyMenu);
