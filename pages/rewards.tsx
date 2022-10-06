import React from 'react';

import Header from '../src/components/common/header';
import RewardContent from '../src/components/content/rewardContent';

function reward() {
  return (
    <>
      <Header isClose={false} isBack />
      <RewardContent />
    </>
  );
}

export default reward;
