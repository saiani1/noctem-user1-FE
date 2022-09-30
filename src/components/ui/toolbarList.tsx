import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/toolbar.module.scss';
import { TOOL_LIST } from '../../../public/assets/datas/ToolbarList';
import ToolbarItem from './toolbarItem';
import { IActive } from '../../types/toolbar.d';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

const toolbarList = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<IActive>({
    Home: false,
    Category: false,
    Pay: false,
    MyPage: false,
  });

  useEffect(() => {
    const idx =
      router.pathname === '/'
        ? 'Home'
        : router.pathname
            .slice(1)
            .replace(/^[a-z]/, char => char.toUpperCase());
    const copyObj: IActive = {
      Home: false,
      Category: false,
      Pay: false,
      MyPage: false,
    };
    copyObj[idx] = true;
    setIsActive(copyObj);
  }, [router.pathname]);

  return (
    <>
      <div className={cx('toolbar-list-wrap')}>
        <ul className={cx('toolbar-list')}>
          {TOOL_LIST &&
            TOOL_LIST.map(v => {
              return (
                <ToolbarItem
                  key={v.txt}
                  isActive={isActive}
                  setIsActive={setIsActive}
                  list={v}
                />
              );
            })}
        </ul>
      </div>
      <div className={cx('blank')} />
    </>
  );
};

export default toolbarList;
