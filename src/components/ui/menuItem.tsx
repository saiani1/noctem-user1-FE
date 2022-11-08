import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

import styles from '../../../styles/pages/categoryPage.module.scss';
import { getCartMenuData } from '../../store/api/cart';
import { getSoldOutMenu } from '../../store/api/store';
import { addComma } from '../../store/utils/function';
import { IDetailMenuInfo } from '../../types/cart';
import { selectedStoreState } from '../../store/atom/orderState';
import { SoldOutBtn } from '../../../public/assets/svg';

const cx = classNames.bind(styles);

interface IProps {
  listName: string;
  item: any;
}

function menuItem({ listName, item }: IProps) {
  const selectedStore = useRecoilValue(selectedStoreState);
  const [info, setInfo] = useState<IDetailMenuInfo>();
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    setIsSoldOut(false);

    if (listName === 'popular') {
      getCartMenuData(item.sizeId, 0).then(res => {
        const resData = res.data.data;
        const selectMenuId = resData.menuId;
        setInfo(resData);

        if (selectedStore.name !== '') {
          getSoldOutMenu(selectedStore.storeId).then(res => {
            const soldOut = res.data.data.find(
              (menu: any) => menu.soldOutMenuId === selectMenuId,
            );
            if (soldOut !== undefined) setIsSoldOut(true);
          });
        }
      });
    } else {
      setInfo(item);
      if (selectedStore.name !== '') {
        getSoldOutMenu(selectedStore.storeId).then(res => {
          const soldOut = res.data.data.find(
            (menu: any) => menu.soldOutMenuId === item.menuId,
          );
          if (soldOut !== undefined) setIsSoldOut(true);
        });
      }
    }
  }, [item]);

  return (
    <>
      {info && (
        <Link
          key={info.menuId}
          href={{
            pathname: `/product/${info.menuId}`,
          }}
        >
          <a>
            <li className={cx('menu-item')}>
              <div className={cx(isSoldOut ? 'close-store' : '')} />
              <div className={cx('menu-img')}>
                <img src={info.menuImg} alt='' />
              </div>
              <div className={cx('menu-detail')}>
                <div className={cx('item-name')}>
                  {info.menuName}
                  {isSoldOut && <SoldOutBtn className={cx('icon')} />}
                </div>
                <div className={cx('item-english-name')}>
                  {info.menuEngName}
                </div>
                <div className={cx('item-price')}>
                  {listName === 'popular'
                    ? addComma(info.totalMenuPrice)
                    : addComma(info.price)}
                  원
                </div>
              </div>
            </li>
          </a>
        </Link>
      )}
    </>
  );
}

export default menuItem;
