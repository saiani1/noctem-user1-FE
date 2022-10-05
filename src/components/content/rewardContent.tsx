import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/rewardContent.module.scss';
import MyRewardTab from './myRewardsTab';
import LevelInfoTab from './levelInfoTab';

function rewardContent() {
  const [clickTab, setClickTab] = useState('reward');
  const cx = classNames.bind(styles);

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    setClickTab((e.target as HTMLInputElement).value);
  };

  return (
    <div className={cx('wrap')}>
      <h2>Noctem Rewards</h2>
      <div className={cx('tab-wrap')}>
        <button
          type='button'
          className={cx(clickTab === 'reward' ? 'active' : '')}
          value='reward'
          onClick={handleClickTab}
        >
          My Rewards
        </button>
        <button
          type='button'
          className={cx(clickTab === 'level' ? 'active' : '')}
          value='level'
          onClick={handleClickTab}
        >
          Level Info
        </button>
        <div className={cx('bar')} />
      </div>
      {clickTab === 'reward' ? <MyRewardTab /> : <LevelInfoTab />}
    </div>
  );
}

export default rewardContent;
