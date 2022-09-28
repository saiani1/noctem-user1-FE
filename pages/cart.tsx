import React from 'react';
import classNames from 'classnames/bind';

import styles from '../styles/pages/cart.module.scss';
import Header from '../src/components/common/header';

function cart() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <Header />
      <h2>장바구니</h2>
    </div>
  );
}

export default cart;
