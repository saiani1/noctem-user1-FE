import React from 'react';
import classNames from 'classnames/bind';
import Router from 'next/router';
import { IProps } from '../types/category.d';
import styles from '../../styles/pages/categoryPage.module.scss';

const cx = classNames.bind(styles);

function categoryItem({
  list,
  setIsClick,
  isClick,
  setCategoryName,
  setCategorySId,
}: {
  list: IProps['list'];
  setIsClick: any;
  isClick: string;
  setCategoryName: any;
  setCategorySId: any;
}) {
  const handleChoice = () => {
    setIsClick(list.categorySName);
    setCategoryName(list.categorySName);
    setCategorySId(list.categorySId);
    Router.push('/category');
  };
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
