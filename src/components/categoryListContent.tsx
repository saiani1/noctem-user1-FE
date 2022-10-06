import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryContent from './categoryContent';
import { getMenuCategory } from '../../pages/api/category';

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
  const [categorySId, setCategorySId] = useState(0);
  const [menuList, setMenuList] = useState<IDrinkList[]>([]);
  useEffect(() => {
    getMenuCategory(categorySId).then(res => {
      console.log(res);
      setMenuList(res.data.data);
    });
  }, [categorySId]);
  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        setCategorySId={setCategorySId}
      />
      <ul>
        {menuList &&
          menuList.map(item => (
            <Link
              href={{
                pathname: `/product/${item.menuId}`,
              }}
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
                    <div className={cx('item-price')}>{item.price}원</div>
                  </div>
                </li>
              </a>
            </Link>
          ))}
      </ul>
      <div className={cx('choice-store')}>
        <div>
          <div>주문할 매장을 선택하세요</div>
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
      </div>
    </>
  );
}

export default categoryListContent;
