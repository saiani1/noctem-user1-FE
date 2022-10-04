import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/myMenuItem.module.scss';

function myMenuItem() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('content-wrap')}>
      <span className={cx('img-wrap')}>
        <Image src='/assets/images/jpg/menu.jpg' width={100} height={100} />
      </span>
      <div className={cx('right')}>
        <div className={cx('menu-contents-wrap')}>
          <button type='button' className={cx('close-btn')}>
            <Image src='/assets/svg/icon-x-mark.svg' width={8} height={8} />
          </button>
          <div className={cx('menu-tit-wrap')}>
            <h3 className={cx('menu-tit')}>아이스 디카페인 카라멜 마키아또</h3>
            <button type='button' className={cx('edit-nickname-btn')}>
              <Image src='/assets/svg/icon-pencil.svg' width={10} height={10} />
            </button>
          </div>
          <span className={cx('menu-option')}>
            ICED | Tall | 일회용컵 | 카라멜 드리즐 많이
          </span>
          <strong className={cx('price')}>6,200원</strong>
        </div>
        <div className={cx('btn-wrap')}>
          <button type='button' className={cx('cart-btn')}>
            담기
          </button>
          <button type='button' className={cx('order-btn')}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default myMenuItem;
