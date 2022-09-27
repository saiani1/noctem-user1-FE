import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/toolbar.module.scss';
import { IProps } from '../../types/toolbar.d';

const cx = classNames.bind(styles);

const toolbarItem = ({
  list,
  isActive,
  handleSelected,
}: {
  list: IProps['list'];
  isActive: IProps['active'];
  handleSelected: IProps['onClick'];
}) => {
  const { link, txt } = list;

  return (
    <li className={cx('toolbar-item')}>
      <button
        type='button'
        onClick={() => {
          handleSelected(link, txt);
        }}
      >
        <i className={cx('toolbar-icon', isActive ? 'active' : '')} />
        <span className={cx('toolbar-txt', isActive ? 'active' : '')}>
          {txt}
        </span>
      </button>
    </li>
  );
};

export default toolbarItem;
