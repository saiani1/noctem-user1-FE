import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/myMenuContent.module.scss';
import ToggleCheckbox from '../ui/toggleCheckbox';
// import EmptyMyMenu from '../content/emptyMyMenu';
import MyMenuItem from '../ui/myMenuItem';

function myMenuContent() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <h2>나만의 메뉴</h2>
      <div className={cx('option-wrap')}>
        <div className={cx('input-wrap')}>
          <label>HOME에서 바로 주문</label>
          {/* <ToggleCheckbox
            // defaultChecked={defaultChecked}
            // onChange={onChange}
            value=''
          /> */}
        </div>
        <button type='button' className={cx('sort-btn')}>
          <Image src='/assets/svg/icon-sort-arrow.svg' width={13} height={13} />
          순서변경
        </button>
      </div>
      {/* <EmptyMyMenu /> */}
      <MyMenuItem />
      <MyMenuItem />
      <MyMenuItem />
      <MyMenuItem />
      <MyMenuItem />
    </div>
  );
}

export default myMenuContent;
