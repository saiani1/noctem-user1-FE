import React from 'react';
import Header from '../src/components/common/header';
import classNames from 'classnames/bind';
import styles from '../styles/content/error.module.scss';

const cx = classNames.bind(styles);

function Error404() {
  return (
    <>
      <Header isClose={false} isBack />
      <div className={cx('error-page')}>
        <img
          src='/assets/images/noctem404.png'
          alt='로고 이미지'
          width={350}
          height={200}
        />
        <p>페이지를 찾을 수 없습니다</p>
      </div>
    </>
  );
}

export default Error404;
