import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryItem from './categoryItem';
// import { categoryFoodList } from '../../public/assets/datas/categoryFoodList';
import { getLageCategory, getSmallCategory } from '../../pages/api/category';
import { useRecoilState } from 'recoil';
import { categoryLState, categorySIdState } from '../store/atom/categoryState';

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
  setCategorySId,
}: {
  setCategoryName: any;
  setCategorySId: any;
}) {
  const [isClick, setIsClick] = useRecoilState(categoryLState);
  const [categoryL, setCategoryL] = useState<ICategory[]>([]);
  const [categoryLName, setCategoryLName] = useState('음료');
  const [categoryLId, setCategoryLId] = useState(1);
  const [categoryDrinkList, setCategoryDrinkList] = useState<IDrinkCategory[]>(
    [],
  );
  const [categoryFoodList, setCategoryFoodList] = useState<IDrinkCategory[]>(
    [],
  );
  const handleChangeCategory = (name: string, id: number) => {
    console.log(name);
    console.log(id);
    setCategoryLName(name);
    setCategorySId(id);

    getSmallCategory(id).then(res => {
      setCategoryDrinkList(res.data.data);
      setCategoryFoodList(res.data.data);
    });
  };
  useEffect(() => {
    getLageCategory().then(res => {
      setCategoryL(res.data.data);
    });

    getSmallCategory(categoryLId).then(res => {
      setCategoryDrinkList(res.data.data);
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
                  handleChangeCategory(item.categoryLName, item.id);
                }}
                onKeyDown={() => {
                  handleChangeCategory(item.categoryLName, item.id);
                }}
              >
                {item.categoryLName}
              </li>
            ))}
        </ul>
        <div className={cx('search-bar')}>
          <div />
          <div className={cx('search-icon')}>
            <Image
              src='/assets/svg/icon-search.svg'
              alt='search'
              width={24}
              height={21}
            />
          </div>
        </div>
        <div>
          <Image
            src='/assets/svg/icon-cart.svg'
            alt='cart'
            width={24}
            height={21}
          />
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
                    setIsClick={setIsClick}
                    isClick={isClick}
                    setCategoryName={setCategoryName}
                    setCategorySId={setCategorySId}
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
                    setIsClick={setIsClick}
                    isClick={isClick}
                    setCategoryName={setCategoryName}
                    setCategorySId={setCategorySId}
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
