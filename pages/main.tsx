import React from 'react';
import HomeContent from '../src/components/homeContent';
import Header from '../src/components/common/header';

function mainPage() {
  return (
    <>
      <Header isClose={false} isBack={false} />
      <HomeContent />
    </>
  );
}

export default mainPage;
