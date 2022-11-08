import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/loadingSpinner.module.scss';

const cx = classNames.bind(styles);

function loadingSpinner() {
  return (
    <div className={cx('loading-wrapper')}>
      <RotatingLines
        strokeColor='#536173'
        strokeWidth='3'
        animationDuration='1'
        width='70'
      />
    </div>
  );
}

export default loadingSpinner;
