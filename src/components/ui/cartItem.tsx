import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from '../../../styles/ui/cartItem.module.scss';

function cartItem() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('cart-item-wrap')}>
      <div className={cx('first-wrap')}>
        <input type='checkbox' />
        <button type='button' className={cx('close-btn')}>
          <Image src='/assets/svg/icon-x-mark.svg' width={8} height={8} />
        </button>
      </div>
      <div className={cx('second-wrap')}>
        <span className={cx('img-wrap')}>
          <Image src='/assets/images/jpg/menu.jpg' width={100} height={100} />
        </span>
        <div className={cx('content-wrap')}>
          <h4 className={cx('kor-name')}>아이스 블랙 글레이즈드 라떼</h4>
          <span className={cx('eng-name')}>Iced Black Glazed Latte</span>
          <div className={cx('option-wrap')}>
            <span className={cx('option')}>ICED | Grande | 매장컵</span>
            <span className={cx('price')}>6,800원</span>
          </div>
          <button type='button' className={cx('option-change-btn')}>
            옵션변경
          </button>
          <div className={cx('num-change-wrap')}>
            <div className={cx('left')}>
              <button
                type='button'
                className={cx('minus-btn')}
                aria-label='minus btn'
              />
              <strong>1</strong>
              <button
                type='button'
                className={cx('plus-btn')}
                aria-label='plus btn'
              />
            </div>
            <span>6,800원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cartItem;
