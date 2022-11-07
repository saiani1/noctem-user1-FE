import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Router from 'next/router';
import { IProps } from '../types/category.d';
import styles from '../../styles/pages/categoryPage.module.scss';
import { useRecoilState } from 'recoil';
import { categoryLState, categorySIdState } from '../store/atom/categoryState';

const cx = classNames.bind(styles);

function categoryItem({
  list,
  setCategoryName,
}: {
  list: IProps['list'];
  setCategoryName: any;
}) {
  const [isClick, setIsClick] = useRecoilState(categoryLState);
  const [categorySId, setCategorySId] = useRecoilState(categorySIdState);

  const handleChoice = () => {
    setIsClick(list.categorySName);
    setCategoryName(list.categorySName);
    setCategorySId(list.categorySId);
    Router.push('/category');
  };

  useEffect(() => {
    if (categorySId === 1) {
      setIsClick('추천');
    } else {
      setIsClick('브레드');
    }
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
