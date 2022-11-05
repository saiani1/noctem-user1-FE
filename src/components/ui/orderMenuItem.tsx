import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/orderMenuItem.module.scss';
import { IMenuList } from '../../types/order';

const cx = classNames.bind(styles);

interface IKeyValue {
  [key: string]: string;
}

const temperatureName: IKeyValue = {
  I: 'ICE',
  H: 'HOT',
};

const sizeName: IKeyValue = {
  T: 'Tall',
  G: 'Grande',
  V: 'Venti',
};

function orderMenuItem({ data }: { data: IMenuList }) {
  const {
    sizeId,
    cartId,
    categorySmall,
    menuFullName,
    menuShortName,
    imgUrl,
    qty,
    menuTotalPrice,
    cupType,
    optionList,
  } = data;
  return (
    <li className={cx('menu-list')}>
      <span className={cx('img-wrap')}>
        <Image src={imgUrl} alt={menuFullName} width={70} height={70} />
      </span>
      <div className={cx('order-contents-wrap')}>
        <p className={cx('order-tit')}>
          {menuFullName} ({qty})
        </p>
        <span className={cx('order-option')}>
          {temperatureName[menuShortName.slice(0, 1)]} |{' '}
          {sizeName[menuShortName.slice(2, 3)]} | {cupType}
        </span>
      </div>
    </li>
  );
}

export default orderMenuItem;
