import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/dndMyMenuItem.module.scss';

function dndMyMenuItem() {
  const cx = classNames.bind(styles);

  return (
    <li className={cx('content-wrap')}>
      <div className={cx('left')}>
        <strong>딸기 아사이 스타벅스 리프레셔</strong>
        <span>ICED | Tall | 개인컵</span>
      </div>
      <span>
        <img src='/assets/svg/icon-hamburger.svg' />
      </span>
    </li>
  );
}

export default dndMyMenuItem;
