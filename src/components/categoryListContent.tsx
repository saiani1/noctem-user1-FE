import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryContent from './categoryContent';
import { getMenuCategory } from '../../src/store/api/category';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categorySIdState } from '../store/atom/categoryState';
import { getCount } from '../../src/store/api/cart';
import { cartCntState, loginState, tokenState } from '../store/atom/userStates';
import { addComma } from '../store/utils/function';
import { getSessionCartCount } from '../store/utils/cart';
import { selectedStoreState } from '../store/atom/orderState';

const cx = classNames.bind(styles);
interface IDrinkList {
  index: number;
  menuId: number;
  menuTemperatureId: number;
  menuName: string;
  menuEngName: string;
  menuImg: string;
  price: number;
}
interface ITemp {
  query: number;
}

function categoryListContent({
  categoryName,
  setCategoryName,
}: {
  categoryName: string;
  setCategoryName: any;
}) {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [categorySId, setCategorySId] = useRecoilState(categorySIdState);
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [cartCount, setCartCount] = useRecoilState(cartCntState);
  const [menuList, setMenuList] = useState<IDrinkList[]>([]);
  useEffect(() => {
    getMenuCategory(categorySId).then(res => {
      console.log(res);
      setMenuList(res.data.data);
    });
    console.log(categorySId);

    if (isLogin) {
      getCount(token).then(res => {
        const resData = res.data.data === null ? 0 : res.data.data;
        setCartCount(resData);
      });
    } else {
      setCartCount(getSessionCartCount());
    }
  }, [categorySId]);

  const handleClickSelectStore = () => {
    router.push(
      {
        pathname: '/selectStore',
        query: {
          isStoreSelect: false,
          backPage: '/category',
        },
      },
      '/selectStore',
    );
  };

  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        setCategorySId={setCategorySId}
        cartCount={cartCount}
      />
      <ul className={cx('product-list')}>
        {menuList &&
          menuList.map(item => (
            <Link
              href={{
                pathname: `/product/${item.menuId}`,
              }}
              key={item.index}
            >
              <a>
                <li key={item.menuTemperatureId} className={cx('menu-item')}>
                  <div className={cx('menu-img')}>
                    <img src={item.menuImg} alt='' />
                  </div>
                  <div className={cx('menu-detail')}>
                    <div className={cx('item-name')}>{item.menuName}</div>
                    <div className={cx('item-english-name')}>
                      {item.menuEngName}
                    </div>
                    <div className={cx('item-price')}>
                      {addComma(item.price)}원
                    </div>
                  </div>
                </li>
              </a>
            </Link>
          ))}
      </ul>
      <div className={cx('select-store-wrap')}>
        <button
          type='button'
          className={cx('select-store')}
          onClick={handleClickSelectStore}
        >
          <span className={cx('tit')}>
            {selectedStore.distance === ''
              ? '주문할 매장을 선택하세요'
              : selectedStore.name}
          </span>
          <Image
            src='/assets/svg/icon-down-arrow-white.svg'
            width={12}
            height={10}
          />
        </button>{' '}
      </div>
    </>
  );
}

export default categoryListContent;
