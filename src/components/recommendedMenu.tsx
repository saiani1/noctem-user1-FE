import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from '../../styles/main/main.module.scss';
import { getCartMenuData } from '../store/api/cart';
import { IPopularMenuList } from '../types/popularMenu';
import { IDetailMenuInfo } from '../types/cart';

const cx = classNames.bind(styles);

interface IProps {
  popularMenuList: IPopularMenuList;
}

function recommendedMenu({ popularMenuList }: IProps) {
  const [menuInfo, setMenuInfo] = useState<IDetailMenuInfo>();

  useEffect(() => {
    getCartMenuData(popularMenuList.sizeId, 0).then(res =>
      setMenuInfo(res.data.data),
    );
  }, []);

  return (
    <li>
      <Link
        href={{
          pathname: `/product/${menuInfo?.menuId}`,
        }}
        key={menuInfo?.menuId}
      >
        <a className={cx('recommended-menu')}>
          <img src={menuInfo?.menuImg} alt={menuInfo?.menuName} />
          <span className={cx('recommended-menu-text')}>
            {menuInfo?.menuName}
          </span>
        </a>
      </Link>
    </li>
  );
}

export default recommendedMenu;
