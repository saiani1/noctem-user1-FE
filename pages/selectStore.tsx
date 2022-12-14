import React from 'react';

import Header from '../src/components/common/header';
import SelectStoreContent from '../src/components/content/selectStoreContent';

function selectStore() {
  return (
    <>
      <Header isClose={false} isBack />
      <SelectStoreContent />
    </>
  );
}

export default selectStore;
