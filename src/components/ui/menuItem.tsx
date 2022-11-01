import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from '../../../styles/pages/categoryPage.module.scss';
import { getCartMenuData } from '../../store/api/cart';
import { addComma } from '../../store/utils/function';
import { IDetailMenuInfo } from '../../types/cart';
import { IPopularMenuList } from '../../types/popularMenu';

const cx = classNames.bind(styles);

interface IProps {
  item: IPopularMenuList;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

function menuItem({ item, isFetching, setIsFetching }: IProps) {
  const [info, setInfo] = useState<IDetailMenuInfo>();

  useEffect(() => {
    getCartMenuData(item.sizeId, 0).then(res => {
      const resData = res.data.data;
      console.log('추천데이터', resData);
      setInfo(resData);
      setIsFetching(true);
    });
  }, []);

  return (
    <>
      {isFetching && (
        <Link
          key={info?.menuId}
          href={{
            pathname: `/product/${info?.menuId}`,
          }}
        >
          <a>
            <li className={cx('menu-item')}>
              <div className={cx('menu-img')}>
                <img src={info?.menuImg} alt='' />
              </div>
              <div className={cx('menu-detail')}>
                <div className={cx('item-name')}>{info?.menuName}</div>
                <div className={cx('item-english-name')}>
                  {info?.menuEngName}
                </div>
                <div className={cx('item-price')}>
                  {info && addComma(info.totalMenuPrice)}원
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
