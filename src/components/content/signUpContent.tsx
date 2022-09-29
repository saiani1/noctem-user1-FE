import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import SignUpHeader from './signUp/signUpHeader';
import styles from '../../../styles/content/signUp.module.scss';
import Agreement from '../common/agreement';
import Certified from './signUp/certified';

const cx = classNames.bind(styles);

function signUpContent() {
  return (
    <div className={cx('wrap', 'signup-wrap')}>
      <SignUpHeader />

      <div style={{ display: 'none' }}>
        <h2>Sign Up</h2>
        <Image
          src='/assets/images/png/logo-symbol.png'
          alt='logo symbol'
          width={80}
          height={100}
        />
        <div className={cx('welcome')}>
          고객님
          <br />
          환영합니다!
        </div>

        {/* 약관동의 */}
        <Agreement />
      </div>

      {/* 본인 확인 */}
      <Certified />

      {/* 아이디 비번 입력 */}

      {/* 이메일 입력 */}

      {/* 닉네임 입력 */}

      <button type='button' className={cx('btn')}>
        다음
      </button>
    </div>
  );
}

export default signUpContent;
