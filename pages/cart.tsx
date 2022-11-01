import React from 'react';

import Header from '../src/components/common/header';
import CartContent from '../src/components/content/cartContent';
import ToolbarList from '../src/components/ui/toolbarList';

function cart() {
  return (
    <>
      <Header isClose={false} isBack />
      <CartContent />
      <ToolbarList />
    </>
  );
}

export default cart;
