import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Router from 'next/router';
import { IProps } from '../types/category.d';
import styles from '../../styles/pages/categoryPage.module.scss';
import { useRecoilState } from 'recoil';
import { categoryLState } from '../store/atom/categoryState';

const cx = classNames.bind(styles);

function categoryItem({
  list,
  setCategoryName,
  setCategorySId,
}: {
  list: IProps['list'];
  setCategoryName: any;
  setCategorySId: any;
}) {
  const [isClick, setIsClick] = useRecoilState(categoryLState);

  const handleChoice = () => {
    console.log('categoryItem', list.categorySName, list.categorySId);
    setIsClick(list.categorySName);
    setCategoryName(list.categorySName);
    setCategorySId(list.categorySId);
    Router.push('/category');
  };

  useEffect(() => {
    setIsClick('추천');
  }, []);

  return (
    <li
      className={isClick === list.categorySName ? cx('active-menu') : undefined}
      role='menuitem'
      onClick={handleChoice}
      onKeyDown={handleChoice}
    >
      {list.categorySName}
    </li>
  );
}

export default categoryItem;
