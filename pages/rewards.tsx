import React from 'react';

import Header from '../src/components/common/header';
import withAuth from '../src/components/common/withAuth';
import RewardContent from '../src/components/content/rewardContent';

function reward() {
  return (
    <>
      <Header isClose={false} isBack />
      <RewardContent />
    </>
  );
}

export default withAuth(reward);
