import React from 'react';
import classNames from 'classnames/bind';

import styles from '../styles/main/main.module.scss';
import HomeContent from '../src/components/homeContent';
import Header from '../src/components/common/header';

const cx = classNames.bind(styles);

function mainPage() {
  return (
    <div className={cx('wrap')}>
      <Header isClose={false} isBack={false} />
      <HomeContent />
    </div>
  );
}

export default mainPage;
