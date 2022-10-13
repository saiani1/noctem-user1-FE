import React from 'react';
import ProductContent from '../../src/components/content/product/productContent';
import Header from '../../src/components/common/header';
import { useRouter } from 'next/router';

function Product() {
  return (
    <>
      <Header isClose={false} isBack />
      <ProductContent />
      {/* <ToolbarList /> */}
    </>
  );
}

export default Product;
