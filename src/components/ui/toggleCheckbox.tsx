import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/toggleCheckbox.module.scss';

interface IProps {
  defaultChecked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function toggleCheckbox(props: IProps) {
  const { defaultChecked, onChange, value } = props;
  const cx = classNames.bind(styles);

  return (
    <div className={cx('toggle-wrap')}>
      <input
        type='checkbox'
        defaultChecked={defaultChecked}
        onChange={onChange}
        value={value}
      />
      <div className={cx('toggle')} />
    </div>
  );
}

export default toggleCheckbox;
