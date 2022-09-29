import React, { useState } from 'react';
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
}: {
  list: IProps['list'];
  setIsClick: any;
  isClick: number;
  setCategoryName: any;
}) {
  const handleChoice = () => {
    Router.push('/category');
    setIsClick(list.id);
    setCategoryName(list.title);
  };
  return (
    <li
      className={isClick === list.id ? cx('active-menu') : undefined}
      role='menuitem'
      onClick={handleChoice}
      onKeyDown={handleChoice}
    >
      {list.title}
    </li>
  );
}

export default categoryItem;
