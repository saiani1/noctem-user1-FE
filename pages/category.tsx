import React, { useState } from 'react';
import CategoryContent from '../src/components/categoryContent';
import CategoryListContent from '../src/components/categoryListContent';
import Header from '../src/components/common/header';
import ToolbarList from '../src/components/ui/toolbarList';

function category() {
  const [categoryName, setCategoryName] = useState('');
  return (
    <>
      <Header isClose={false} isBack />
      <CategoryListContent
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      />
      <ToolbarList />
    </>
  );
}

export default category;
