import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/main/main.module.scss';
import { useRouter } from 'next/router';
import { getMyMenuData } from './../../pages/api/cart';
import { IMenuData1, IMenuDetailData } from '../types/myMenu';

const cx = classNames.bind(styles);

function myMenuCard({ item }: { item: IMenuData1 }) {
  const router = useRouter();
  const [myMenuInfo, setMyMenuInfo] = useState<IMenuDetailData>();
  useEffect(() => {
    getMyMenuData(item.sizeId, item.myMenuId).then(res => {
      console.log('detail', res.data.data);
      setMyMenuInfo(res.data.data);
    });
  }, []);
  return (
    <>
      {myMenuInfo && (
        <div className={cx('my-menu-true')}>
          <div className={cx('my-menu-info-wrap')}>
            <div className={cx('my-menu-title')}>{item.alias}</div>
            <div className={cx('my-menu-kind')}>{myMenuInfo?.menuName}</div>
            <div className={cx('my-menu-detail')}>
              {myMenuInfo.temperature.toUpperCase()} | Tall | 매장 컵 |
              에스프레소 샵1 | 얼음 적게 | 일반휘핑 많이 | 초콜릿 드리즐
            </div>
          </div>
          <div className={cx('mymenu-order-wrap')}>
            <div className={cx('img')}>
              <img src={myMenuInfo.menuImg} />
            </div>
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
      )}
    </>
  );
}

export default myMenuCard;
