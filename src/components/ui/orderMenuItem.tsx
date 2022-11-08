import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/orderMenuItem.module.scss';
import { IMenuList } from '../../types/order';
import { getMenuDetail } from '../../store/api/order';
import { useRecoilState } from 'recoil';
import { orderProductDataState } from '../../store/atom/orderState';

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
  const [imgUrlTemp, setImgUrlTemp] = useState<string>();

  useEffect(() => {
    if (imgUrl === null) {
      getMenuDetail(sizeId, 0)
        .then(res => {
          setImgUrlTemp(res.data.data.imgUrl);
        })
        .catch(err => {
          new err();
        });
    } else {
      setImgUrlTemp(imgUrl);
    }
  }, []);

  return (
    <li className={cx('menu-list')}>
      <span className={cx('img-wrap')}>
        {imgUrlTemp && (
          <Image src={imgUrlTemp} alt={menuFullName} width={70} height={70} />
        )}
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
