import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../../styles/content/signUp/signUpComplate.module.scss';

const cx = classNames.bind(styles);

function signUpComplate() {
  return (
    <div className={cx('wrap')}>
      <p>환영합니다.</p>
      <p>OOO님 가입을 축하드립니다.</p>
    </div>
  );
}

export default signUpComplate;
