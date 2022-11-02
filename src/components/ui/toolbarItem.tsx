import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/toolbar.module.scss';
import { IProps, IActive } from '../../types/toolbar.d';
import {
  HomeBtn,
  OrderBtn,
  CartBtn,
  MyPageBtn,
} from '../../../public/assets/svg/toolbar';

const cx = classNames.bind(styles);

const toolbarItem = ({
  list,
  isActive,
  setIsActive,
}: {
  list: IProps['list'];
  isActive: IProps['active'];
  setIsActive: IProps['setIsActive'];
}) => {
  const router = useRouter();
  const { link, linkTxt, txt } = list;

  console.log('툴바에요!', list);
  const handleSelected: (link: string) => void = (link: string) => {
    const idx =
      link === '/'
        ? 'Home'
        : link.slice(1).replace(/^[a-z]/, char => char.toUpperCase());
    const copyObj: IActive = {
      Home: false,
      Category: false,
      Pay: false,
      MyPage: false,
    };
    copyObj[idx] = true;
    setIsActive(copyObj);
    router.push(link);
  };

  return (
    <li className={cx('toolbar-item')}>
      <button
        type='button'
        onClick={() => {
          handleSelected(link);
        }}
      >
        {linkTxt === 'Home' && (
          <HomeBtn
            className={cx('toolbar-icon', isActive[linkTxt] ? 'active' : '')}
          />
        )}
        {linkTxt === 'Category' && (
          <OrderBtn
            className={cx('toolbar-icon', isActive[linkTxt] ? 'active' : '')}
          />
        )}
        {linkTxt === 'Cart' && (
          <CartBtn
            className={cx('toolbar-icon', isActive[linkTxt] ? 'active' : '')}
          />
        )}
        {linkTxt === 'MyPage' && (
          <MyPageBtn
            className={cx('toolbar-icon', isActive[linkTxt] ? 'active' : '')}
          />
        )}
        <span className={cx('toolbar-txt', isActive[linkTxt] ? 'active' : '')}>
          {txt}
        </span>
      </button>
    </li>
  );
};

export default toolbarItem;
