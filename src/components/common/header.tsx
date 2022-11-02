import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../../../styles/common/header.module.scss';
import { CloseBtn, LeftArrowBtn } from '../../../public/assets/svg';

const cx = classNames.bind(styles);

function header({ isClose, isBack }: { isClose: boolean; isBack: boolean }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleBack = () => {
    router.back();
  };

  const handleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={cx('header-wrap')}>
      <button
        type='button'
        onClick={handleBack}
        className={cx('header-back-arrow')}
      >
        {isClose && <CloseBtn className={cx('icon')} />}
        {isBack && <LeftArrowBtn className={cx('icon')} />}
      </button>
      <div className={cx('header-logo')}>
        <h1 className={cx('header-title')}>Cafe Noctem Order</h1>
        <Link href='/'>
          <a href='/'>
            <Image
              width={93}
              height={21}
              alt='logo title image'
              src={
                theme === 'dark'
                  ? '/assets/images/png/logo-title-darkmode.png'
                  : '/assets/images/png/logo-title.png'
              }
            />
          </a>
        </Link>
      </div>
      {/* <button
        type='button'
        onClick={handleDarkMode}
        className={cx('darkBtn')}
        style={{ padding: '10px', backgroundColor: 'pink' }}
      >
        다크모드
      </button> */}
    </div>
  );
}

export default header;
