import React from 'react';
import Header from '../src/components/common/header';
import MyPageContent from '../src/components/content/myPageContent';
import ToolbarList from '../src/components/ui/toolbarList';

function myPage() {
  return (
    <>
      <Header isClose={false} isBack={false} />
      <MyPageContent />
      <ToolbarList />
    </>
  );
}

export default myPage;
