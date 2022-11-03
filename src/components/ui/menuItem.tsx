import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

import styles from '../../../styles/pages/categoryPage.module.scss';
import { getCartMenuData } from '../../store/api/cart';
import { getSoldOutMenu } from '../../store/api/store';
import { addComma } from '../../store/utils/function';
import { IDetailMenuInfo } from '../../types/cart';
import { IPopularMenuList } from '../../types/popularMenu';
import { selectedStoreState } from '../../store/atom/orderState';

const cx = classNames.bind(styles);

interface IProps {
  item: IPopularMenuList;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

function menuItem({ item, isFetching, setIsFetching }: IProps) {
  const [info, setInfo] = useState<IDetailMenuInfo>();
  const selectedStore = useRecoilValue(selectedStoreState);

  useEffect(() => {
    setIsFetching(false);
    getCartMenuData(item.sizeId, 0).then(res => {
      const resData = res.data.data;
      const selectMenuId = resData.menuId;
      setInfo(resData);

      if (selectedStore.name !== '') {
        getSoldOutMenu(selectedStore.storeId).then(res => {
          const resData2 = res.data.data;
          const isSoldOut = resData2.find(
            (menu: any) => menu.soldOutMenuId === selectMenuId,
          );
          if (isSoldOut === undefined) setIsFetching(true);
          else setInfo(undefined);
        });
      }
    });
  }, []);

  return (
    <>
      {isFetching && info && (
        <Link
          key={info.menuId}
          href={{
            pathname: `/product/${info.menuId}`,
          }}
        >
          <a>
            <li className={cx('menu-item')}>
              <div className={cx('menu-img')}>
                <img src={info.menuImg} alt='' />
              </div>
              <div className={cx('menu-detail')}>
                <div className={cx('item-name')}>{info.menuName}</div>
                <div className={cx('item-english-name')}>
                  {info.menuEngName}
                </div>
                <div className={cx('item-price')}>
                  {addComma(info.totalMenuPrice)}원
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
