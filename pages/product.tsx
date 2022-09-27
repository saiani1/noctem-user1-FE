import React from 'react';
import ProductContent from '../src/components/productContent';
import Header from '../src/components/common/header';
import ToolbarList from '../src/components/ui/toolbarList';

function product() {
  return (
    <>
      <Header />
      <ProductContent />
      <ToolbarList />
    </>
  );
}

export default product;
