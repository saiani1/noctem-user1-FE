import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../../styles/content/signUp/step1.module.scss';
import AgreementList from '../../common/agreementList';

const cx = classNames.bind(styles);

function step1() {
  return (
    <>
      <h2>Sign Up</h2>
      <div className={cx('logo-wrap')}>
        <Image
          src='/assets/images/png/logo-symbol.png'
          alt='logo symbol'
          width={80}
          height={100}
        />
      </div>
      <div className={cx('welcome')}>
        고객님
        <br />
        환영합니다!
      </div>
      <div>회원가입을 위해 약관에 동의해 주세요.</div>

      {/* 약관동의 */}
      <div className={cx('agreement-wrap')}>
        <AgreementList />
      </div>

      <button type='button' className={cx('btn', 'btn-bottom', 'btn-disable')}>
        다음
      </button>
    </>
  );
}

export default step1;
