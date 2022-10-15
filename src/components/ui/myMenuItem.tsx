import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import { getMyMenu2 } from '../../../pages/api/myMenu';
import styles from '../../../styles/ui/myMenuItem.module.scss';
import { IMenu1, IMenu2 } from '../../../src/types/myMenu.d';
import { addComma } from './../../store/utils/function';

interface Props {
  item: IMenu1;
  isEmpty: boolean;
  successCall: boolean;
  isFetching: boolean;
  handleDeleteMenu: (e: React.MouseEvent<HTMLElement>) => void;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteMyMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function myMenuItem({
  item,
  isEmpty,
  successCall,
  isFetching,
  handleDeleteMenu,
  setIsFetching,
  setIsDeleteMyMenu,
}: Props) {
  const [itemInfo, setItemInfo] = useState<IMenu2>();
  const cx = classNames.bind(styles);

  useEffect(() => {
    if (successCall && !isEmpty) {
      getMyMenu2(item.sizeId, item.myMenuId).then(res => {
        setItemInfo(res.data.data);
        setIsFetching(true);
        setIsDeleteMyMenu(false);
      });
    }
  }, []);
  return (
    <>
      {isFetching && !isEmpty && (
        <li className={cx('content-wrap')}>
          <img
            src={itemInfo?.menuImg}
            alt={itemInfo?.menuName}
            className={cx('img-wrap')}
          />
          <div className={cx('right')}>
            <div className={cx('menu-contents-wrap')}>
              <button
                type='button'
                className={cx('close-btn')}
                name={itemInfo?.myMenuId}
                onClick={handleDeleteMenu}
              >
                <img src='/assets/svg/icon-x-mark.svg' alt='삭제버튼' />
              </button>
              <div className={cx('menu-tit-wrap')}>
                <h3 className={cx('menu-tit')}>{item?.alias}</h3>
                <button type='button' className={cx('edit-nickname-btn')}>
                  <Image
                    src='/assets/svg/icon-pencil.svg'
                    width={10}
                    height={10}
                  />
                </button>
              </div>
              <span className={cx('sub-tit')}>{itemInfo?.menuName}</span>
              <strong className={cx('price')}>
                {itemInfo?.totalMenuPrice && addComma(itemInfo?.totalMenuPrice)}
                원
              </strong>
              <span className={cx('menu-option')}>
                {itemInfo?.temperature} | {itemInfo?.size}
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
      )}
    </>
  );
}

export default myMenuItem;
