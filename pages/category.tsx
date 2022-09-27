import React from 'react';
import CategoryContent from '../src/components/categoryContent';
import Header from '../src/components/common/header';
import ToolbarList from '../src/components/ui/toolbarList';

function category() {
  return (
    <>
      <Header />
      <CategoryContent />
      <ToolbarList />
    </>
  );
}

export default category;
