import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryContent from './categoryContent';
import { getMenuCategory } from '../store/api/category';
import {
  categoryLNameState,
  categorySIdState,
} from '../store/atom/categoryState';
import { getPopularMenu } from '../store/api/popularMenu';
import { getCount } from '../store/api/cart';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartCntState, loginState, tokenState } from '../store/atom/userStates';
import { getSessionCartCount } from '../store/utils/cart';
import { selectedStoreState } from '../store/atom/orderState';
import { IStore } from '../types/store';
import { IPopularMenuList } from '../types/popularMenu';
import MenuItem from './ui/menuItem';
import { DownArrowBtn } from '../../public/assets/svg';
import { IDetailMenuInfo } from '../types/cart';

const cx = classNames.bind(styles);

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
  const [categoryLName, setCategoryLName] = useRecoilState(categoryLNameState);
  const [selectedStoreTemp, setSelectedStoreTemp] = useState<IStore>({
    index: 0,
    storeId: 0,
    name: '',
    mainImg: '',
    address: '',
    businessOpenHours: '',
    businessCloseHours: '',
    isOpen: false,
    isParking: false,
    isEcoStore: false,
    isDriveThrough: false,
    distance: '',
    contactNumber: '',
  });
  const selectedStore = useRecoilValue(selectedStoreState);
  const [cartCount, setCartCount] = useRecoilState(cartCntState);
  const [menuList, setMenuList] = useState<IDetailMenuInfo[]>([]);
  const [popularMenuInfo, setPopularMenuInfo] = useState<IPopularMenuList[]>(
    [],
  );

  useEffect(() => {
    setSelectedStoreTemp(selectedStore);
  }, []);

  useEffect(() => {
    if (categorySId === 2 && categoryLName === '음료') {
      getPopularMenu().then(res => {
        setPopularMenuInfo(res.data.data);
      });
    } else {
      getMenuCategory(categorySId).then(res => {
        setMenuList(res.data.data);
      });
    }

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
        {categorySId !== 2
          ? menuList.map((item: IDetailMenuInfo) => (
              <MenuItem
                key={`menu-${item.index}`}
                listName='menu'
                item={item}
              />
            ))
          : popularMenuInfo.map(item => (
              <MenuItem
                key={`popular-${item.index}`}
                listName='popular'
                item={item}
              />
            ))}
      </ul>
      <div className={cx('select-store-wrap')}>
        <button
          type='button'
          className={cx('select-store')}
          onClick={handleClickSelectStore}
        >
          <span className={cx('tit')}>
            {selectedStoreTemp.distance === ''
              ? '주문할 매장을 선택하세요'
              : selectedStoreTemp.name}
          </span>
          <DownArrowBtn />
        </button>{' '}
      </div>
    </>
  );
}

export default categoryListContent;
