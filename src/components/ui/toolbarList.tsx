import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/toolbar.module.scss';
import { TOOL_LIST } from '../../../public/assets/datas/ToolbarList';
import ToolbarItem from './toolbarItem';
import { IActive } from '../../types/toolbar.d';

const cx = classNames.bind(styles);

const toolbarList = () => {
  const [isActive, setActive] = useState<IActive>({
    Home: true,
    Order: false,
    Pay: false,
    My: false,
  });

  const handleSelected = (menu: string) => {
    const newState: IActive = {
      Home: true,
      Order: false,
      Pay: false,
      My: false,
    };
    Object.keys(isActive).forEach(key => {
      if (key === menu) {
        newState[key] = true;
      } else {
        newState[key] = false;
      }
    });
    setActive(newState);
  };

  return (
    <>
      <div className={cx('toolbar-list-wrap')}>
        <ul className={cx('toolbar-list')}>
          {TOOL_LIST &&
            TOOL_LIST.map(v => {
              return (
                <ToolbarItem
                  key={v.txt}
                  isActive={isActive[v.txt]}
                  list={v}
                  handleSelected={handleSelected}
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
