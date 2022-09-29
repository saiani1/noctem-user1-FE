import React from 'react';
import HomeContent from '../src/components/homeContent';
import Header from '../src/components/common/header';
import ToolbarList from '../src/components/ui/toolbarList';

function mainPage() {
  return (
    <>
      <Header />
      <HomeContent />
      <ToolbarList />
    </>
  );
}

export default mainPage;
