import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryItem from './categoryItem';
import {
  getLargeCategory,
  getSmallCategory,
} from '../../src/store/api/category';
import { useRecoilState } from 'recoil';
import {
  categoryLIdState,
  categoryLNameState,
  categorySIdState,
} from '../store/atom/categoryState';
import Link from 'next/link';
import { CartBtn } from '../../public/assets/svg/toolbar';

const cx = classNames.bind(styles);

interface ICategory {
  id: number;
  categoryLName: string;
}
interface IDrinkCategory {
  index: number;
  categorySId: number;
  categorySImg: string;
  categorySName: string;
}

function categoryContent({
  setCategoryName,
  cartCount,
}: {
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  cartCount: number;
}) {
  const [categoryLName, setCategoryLName] = useRecoilState(categoryLNameState);
  const [categoryL, setCategoryL] = useState<ICategory[]>([]);
  const [categoryLId, setCategoryLId] = useRecoilState(categoryLIdState);
  const [categoryDrinkList, setCategoryDrinkList] = useState<IDrinkCategory[]>(
    [],
  );
  const [categoryFoodList, setCategoryFoodList] = useState<IDrinkCategory[]>(
    [],
  );

  const [, setCategorySId] = useRecoilState(categorySIdState);
  const handleChangeLCategory = (name: string, id: number) => {
    // 음료, 푸드 변경 시에만 작동
    setCategoryLName(name);
    setCategoryLId(id);
    if (name === '음료') {
      setCategorySId(2);
    } else {
      setCategorySId(14);
    }

    getSmallCategory(id).then(res => {
      setCategoryDrinkList(res.data.data);
      setCategoryFoodList(res.data.data);
    });
  };
  useEffect(() => {
    getLargeCategory().then(res => {
      setCategoryL(res.data.data);
    });
    getSmallCategory(categoryLId).then(res => {
      setCategoryDrinkList(res.data.data);
      setCategoryFoodList(res.data.data);
    });
  }, []);
  return (
    <>
      <div className={cx('menu-bar')}>
        <div
          className={
            categoryLName === '음료'
              ? cx('state-bar-drink')
              : cx('state-bar-food')
          }
        />
        <ul>
          {categoryL &&
            categoryL.map(item => (
              <li
                key={item.id}
                role='menuitem'
                onClick={() => {
                  handleChangeLCategory(item.categoryLName, item.id);
                }}
                onKeyDown={() => {
                  handleChangeLCategory(item.categoryLName, item.id);
                }}
              >
                {item.categoryLName}
              </li>
            ))}
        </ul>
        <div className={cx('cart-cnt-wrap')}>
          {cartCount !== 0 && <div className={cx('cnt')}>{cartCount}</div>}
          <Link href='/cart'>
            <CartBtn className={cx('icon')} />
          </Link>
        </div>
      </div>
      <div className={cx('menu-category')}>
        {categoryLName === '음료' ? (
          <ul>
            {categoryDrinkList &&
              categoryDrinkList.map(item => {
                return (
                  <CategoryItem
                    key={item.categorySName}
                    list={item}
                    setCategoryName={setCategoryName}
                  />
                );
              })}
          </ul>
        ) : (
          <ul>
            {categoryFoodList &&
              categoryFoodList.map(item => {
                return (
                  <CategoryItem
                    key={item.categorySName}
                    list={item}
                    setCategoryName={setCategoryName}
                  />
                );
              })}
          </ul>
        )}
      </div>
    </>
  );
}

export default categoryContent;
