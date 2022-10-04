import React from 'react';

import Header from '../src/components/common/header';
import MyMenuContent from '../src/components/content/myMenuContent';

function MyMenu() {
  return (
    <>
      <Header isClose={false} isBack />
      <MyMenuContent />
    </>
  );
}

export default MyMenu;
