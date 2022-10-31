import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from '../../../styles/pages/categoryPage.module.scss';
import { getCartMenuData } from '../../store/api/cart';
import { addComma } from '../../store/utils/function';

const cx = classNames.bind(styles);

interface IDrinkList {
  index: number;
  menuId: number;
  menuTemperatureId: number;
  menuName: string;
  menuEngName: string;
  menuImg: string;
  price: number;
  totalMenuPrice: number;
}

interface IProps {
  sizeId: number;
  item: IDrinkList;
  categoryName: string;
}

function menuItem({ sizeId, item, categoryName }: IProps) {
  const [info, setInfo] = useState<IDrinkList>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log(categoryName);
    setIsFetching(false);
    if (categoryName === '추천') {
      getCartMenuData(sizeId, 0).then(res => {
        setInfo(res.data.data);
        console.log('추천!');
      });
      setIsFetching(true);
    } else {
      console.log('기타', item);
      setInfo(item);
      setIsFetching(true);
    }
  }, [categoryName]);

  return (
    <>
      {isFetching && (
        <Link
          key={info?.menuTemperatureId}
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
                {/* <div className={cx('item-price')}>
                  {categoryName === '추천'
                    ? info && addComma(info.totalMenuPrice)
                    : info && addComma(info.price)}
                  원
                </div> */}
              </div>
            </li>
          </a>
        </Link>
      )}
    </>
  );
}

export default menuItem;
