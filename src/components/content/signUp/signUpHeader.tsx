import Image from 'next/image';
import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../../styles/content/signUp/signUpHeader.module.scss';

const cx = classNames.bind(styles);

function signUpHeader() {
  return (
    <div className={cx('signup-header-wrap')}>
      <div className={cx('close-icon-wrap')}>
        <Image
          width={18}
          height={18}
          alt='close icon'
          src='/assets/svg/icon-close.svg'
        />
      </div>
      <div className={cx('progress')}>
        <div className={cx('stepper-item', 'completed')}>
          <div className={cx('step-counter')}>1</div>
        </div>
        <div className={cx('stepper-item', 'completed')}>
          <div className={cx('step-counter')}>2</div>
        </div>
        <div className={cx('stepper-item', 'completed')}>
          <div className={cx('step-counter')}>3</div>
        </div>
        <div className={cx('stepper-item')}>
          <div className={cx('step-counter')}>4</div>
        </div>
      </div>
    </div>
  );
}

export default signUpHeader;
