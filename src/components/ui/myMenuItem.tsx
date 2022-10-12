import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/myMenuItem.module.scss';
import { IMenu } from '../../../src/types/myMenu.d';

interface Props {
  item: IMenu;
  handleDeleteMenu: (e: React.MouseEvent<HTMLElement>) => void;
}

function myMenuItem({ item, handleDeleteMenu }: Props) {
  const {
    alias,
    menuImg,
    menuName,
    totalMenuPrice,
    myMenuId,
    size,
    temperature,
  } = item;
  const cx = classNames.bind(styles);

  return (
    <li className={cx('content-wrap')}>
      <img src={menuImg} alt={menuName} className={cx('img-wrap')} />
      <div className={cx('right')}>
        <div className={cx('menu-contents-wrap')}>
          <button
            type='button'
            className={cx('close-btn')}
            name={myMenuId}
            onClick={handleDeleteMenu}
          >
            <img src='/assets/svg/icon-x-mark.svg' alt='삭제버튼' />
          </button>
          <div className={cx('menu-tit-wrap')}>
            <h3 className={cx('menu-tit')}>{alias}</h3>
            <button type='button' className={cx('edit-nickname-btn')}>
              <Image src='/assets/svg/icon-pencil.svg' width={10} height={10} />
            </button>
          </div>
          <span className={cx('sub-tit')}>{menuName}</span>
          <strong className={cx('price')}>
            {totalMenuPrice.toLocaleString()}원
          </strong>
          <span className={cx('menu-option')}>
            {temperature} | {size}
          </span>
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
    </li>
  );
}

export default myMenuItem;
