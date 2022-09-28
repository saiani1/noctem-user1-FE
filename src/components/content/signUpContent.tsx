import React from 'react';
import classNames from 'classnames/bind';
import Step1 from './signUp/step1';
import Step2 from './signUp/step2';
import SignUpComplate from './signUp/signUpComplate';
import styles from '../../../styles/content/signUp.module.scss';

const cx = classNames.bind(styles);

function signUpContent() {
  return (
    <div className={cx('wrap', 'signup-wrap')}>
      {/* <Step1 /> */}
      {/* <Step2 /> */}
      <SignUpComplate />
    </div>
  );
}

export default signUpContent;
