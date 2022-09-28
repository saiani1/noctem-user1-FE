import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { IProps } from '../types/category.d';
import styles from '../../styles/pages/categoryPage.module.scss';

const cx = classNames.bind(styles);

function categoryItem({
  list,
  setIsClick,
  isClick,
}: {
  list: IProps['list'];
  setIsClick: any;
  isClick: number;
}) {
  const handleChoice = () => {
    setIsClick(list.id);
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
