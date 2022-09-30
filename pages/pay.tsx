import React from 'react';
import Header from '../src/components/common/header';
import ToolbarList from '../src/components/ui/toolbarList';

function pay() {
  return (
    <>
      <Header isClose={false} isBack />
      <h1>Pay</h1>
      <ToolbarList />
    </>
  );
}

export default pay;
