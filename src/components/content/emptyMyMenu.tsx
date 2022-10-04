import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/emptyMyMenu.module.scss';

function emptyMyMenu() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('content-wrap')}>
      <h3 className={cx('empty-tit')}>등록된 나만의 메뉴가 없습니다.</h3>
      <p className={cx('empty-content')}>
        좋아하는 메뉴에💚를 누르고 편리하게 주문해 보세요.
        <br />
        등록된 나만의 메뉴는 HOME 화면에서도 바로 주문하실 수 있습니다.
      </p>
      <span className={cx('img-wrap')}>
        <Image
          src='/assets/images/jpg/cup-illust.jpg'
          width={182}
          height={200}
        />
      </span>
    </div>
  );
}

export default emptyMyMenu;
