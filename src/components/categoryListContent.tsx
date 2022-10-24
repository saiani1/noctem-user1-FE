import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryContent from './categoryContent';
import { getMenuCategory } from '../api/category';
import { useRecoilState } from 'recoil';
import { categorySIdState } from '../store/atom/categoryState';
import { getCount } from '../api/cart';
import { cartCnt } from '../store/atom/userStates';
import { addComma, getSessionCartCount } from '../store/utils/function';
import { isExistToken } from './../store/utils/token';
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
  const [categorySId, setCategorySId] = useRecoilState(categorySIdState);
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [cartCount, setCartCount] = useRecoilState(cartCnt);
  const [menuList, setMenuList] = useState<IDrinkList[]>([]);
  useEffect(() => {
    getMenuCategory(categorySId).then(res => {
      console.log(res);
      setMenuList(res.data.data);
    });
    console.log(categorySId);

    if (isExistToken()) {
      getCount().then(res => {
        setCartCount(res.data.data);
      });
    } else {
      setCartCount(getSessionCartCount());
    }
  }, [categorySId]);

  const handleClickSelectStore = () => {
    router.push({
      pathname: '/selectStore',
      query: {
        isStoreSelect: false,
        backPage: '/category',
      },
    });
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
      <button
        type='button'
        className={cx('choice-store')}
        onClick={handleClickSelectStore}
      >
        <div>
          <div>
            {selectedStore.distance === ''
              ? '주문할 매장을 선택하세요'
              : selectedStore.name}
          </div>
          <div>
            <Image
              src='/assets/svg/icon-down-arrow.svg'
              alt='down-arrow'
              width={24}
              height={21}
            />
          </div>
        </div>
        <hr />
      </button>
    </>
  );
}

export default categoryListContent;
