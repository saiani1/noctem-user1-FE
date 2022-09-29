import React from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/common/header.module.scss';

const cx = classNames.bind(styles);

function header() {
  const router = useRouter();

  return (
    <div className={cx('header-wrap')}>
      <button
        type='button'
        onClick={() => {
          router.back();
        }}
        className={cx('header-back-arrow')}
      >
        <Image
          width={11}
          height={19}
          alt='back button icon'
          src='/assets/svg/icon-back-arrow.svg'
        />
      </button>
      <div className={cx('header-logo')}>
        <h1 className={cx('header-title')}>Cafe Noctem Order</h1>
        <Link href='/'>
          <a href='/'>
            <Image
              width={93}
              height={21}
              alt='logo title image'
              src='/assets/images/png/logo-title.png'
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default header;
