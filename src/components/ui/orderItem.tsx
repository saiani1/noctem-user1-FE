import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from '../../../styles/content/orderContent.module.scss';
import { IMenuList } from './../../types/order.d';
import { addComma } from '../../store/utils/function';
import { getMenuDetail } from '../../../src/store/api/order';

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

function orderItem({ menu }: { menu: IMenuList }) {
  const {
    sizeId,
    cartId,
    menuFullName,
    menuShortName,
    imgUrl,
    qty,
    menuTotalPrice,
    optionList,
  } = menu;
  const [myMenuInfo, setMyMenuInfo] = useState<IMenuList>();

  useEffect(() => {
    getMenuDetail(sizeId, cartId).then(res => {
      const resData = res.data.data;
      const mymenuInfo = {
        ...resData,
        sizeId: sizeId,
      };
      console.log('myMenuInfo', mymenuInfo);
      setMyMenuInfo(mymenuInfo);
    });
  }, []);

  return (
    <li>
      <div className={cx('order-info')}>
        <div className={cx('img-wrap')}>
          {imgUrl && (
            <Image src={imgUrl} alt={menuFullName} width={40} height={40} />
          )}
        </div>
        <div className={cx('order-info-text-wrap')}>
          <div className={cx('order-item-wrap')}>
            <p>
              {menuFullName} ({qty})
            </p>
            <span>{addComma(menuTotalPrice / qty)}원</span>
          </div>
          <div className={cx('order-option-wrap')}>
            {optionList && (
              <p>
                {optionList.map(option => (
                  <span>{option}</span>
                ))}
              </p>
            )}
            {myMenuInfo && (
              <p>
                {temperatureName[myMenuInfo.menuShortName.slice(0, 1)]} |{' '}
                {sizeName[myMenuInfo.menuShortName.slice(2, 3)]} | 개인 컵
              </p>
            )}
            <span>{addComma(menuTotalPrice)}원</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default orderItem;
