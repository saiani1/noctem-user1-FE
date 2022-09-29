import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryItem from './categoryItem';
import { categoryList } from '../../public/assets/datas/categoryList';
import { categoryFoodList } from '../../public/assets/datas/categoryFoodList';

const cx = classNames.bind(styles);

function categoryContent({ setCategoryName }: { setCategoryName: any }) {
  const [isClick, setIsClick] = useState(0);
  const [categoryL, setCategoryL] = useState('drink');
  const handleChangeCategory = (name: string) => {
    console.log(name);
    setCategoryL(name);
  };
  return (
    <>
      <div className={cx('menu-bar')}>
        <div
          className={
            categoryL === 'drink' ? cx('state-bar-drink') : cx('state-bar-food')
          }
        />
        <ul>
          <li
            role='menuitem'
            onClick={() => {
              handleChangeCategory('drink');
            }}
            onKeyDown={() => {
              handleChangeCategory('drink');
            }}
          >
            음료
          </li>
          <li
            role='menuitem'
            onClick={() => {
              handleChangeCategory('food');
            }}
            onKeyDown={() => {
              handleChangeCategory('food');
            }}
          >
            푸드
          </li>
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
        {categoryL === 'drink' ? (
          <ul>
            {categoryList &&
              categoryList.map(item => {
                return (
                  <CategoryItem
                    key={item.id}
                    list={item}
                    setIsClick={setIsClick}
                    isClick={isClick}
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
                    key={item.id}
                    list={item}
                    setIsClick={setIsClick}
                    isClick={isClick}
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
