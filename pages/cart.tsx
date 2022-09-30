import React from 'react';

import Header from '../src/components/common/header';
import CartContent from '../src/components/content/cartContent';

function cart() {
  return (
    <>
      <Header isClose={false} isBack />
      <CartContent />
    </>
  );
}

export default cart;
