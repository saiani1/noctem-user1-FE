import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from '../../../styles/content/orderContent.module.scss';
import { IMenuData } from './../../types/order.d';
import { addComma } from '../../store/utils/function';

const cx = classNames.bind(styles);

function orderItem({ menu }: { menu: IMenuData }) {
  const {
    sizeId,
    menuFullName,
    menuShortName,
    imgUrl,
    qty,
    menuTotalPrice,
    optionList,
  } = menu;

  return (
    <li>
      <div className={cx('order-info')}>
        <div className={cx('img-wrap')}>
          <Image src={imgUrl} alt={menuFullName} width={40} height={40} />
        </div>
        <div className={cx('order-info-text-wrap')}>
          <div className={cx('order-item-wrap')}>
            <p>
              {menuFullName} ({qty})
            </p>
            <span>{addComma(menuTotalPrice / qty)}원</span>
          </div>
          <div className={cx('order-option-wrap')}>
            {/* <p>{optionList}</p> */}
            <p>ICE | Tall | 개인 컵</p>
            <span>{addComma(menuTotalPrice)}원</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default orderItem;
