import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/main/main.module.scss';
import { useRouter } from 'next/router';
import { IData } from '../types/cart';
import {
  getCartMenuData,
} from '../../pages/api/cart';

const cx = classNames.bind(styles);

function myMenuCard({ item }: { item: any }) {
  const router = useRouter();
  const [myMenuInfo, setMyMenuInfo] = useState<IData>()
  useEffect(() => {
    getCartMenuData(item.sizeId, item.myMenuId).then(res => {
      setMyMenuInfo(res.data.data);
    });
  }, []);
  return (
    <>
      <div className={cx('my-menu-true')}>
        <div>
          <div className={cx('my-menu-title')}>{item.alias}</div>
          <div className={cx('my-menu-kind')}>{myMenuInfo?.menuName}</div>
          <div className={cx('my-menu-detail')}>
            {myMenuInfo?.myPersonalOptionList}
          </div>
        </div>
        <div>
          <div className={cx('img')}><img src={myMenuInfo?.menuImg}/></div>
          <div
            className={cx('order-button')}
            onClick={() => {
              router.push('/order');
            }}
          >
            주문하기
          </div>
        </div>
      </div>
    </>
  );
}

export default myMenuCard;
