import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../../styles/content/signUp/signUpComplate.module.scss';
import { IStep3Props } from '../../../types/signUp.d';

const cx = classNames.bind(styles);

function signUpComplate({
  nickName,
  setStep,
}: {
  nickName: IStep3Props['nickName'];
  setStep: IStep3Props['setStep'];
}) {
  return (
    <div className={cx('wrap')}>
      <div className={cx('signUpCompalte-wrap')}>
        <div className={cx('logo-wrap')}>
          <Image
            width={110}
            height={150}
            alt='logo symbol'
            src='/assets/images/png/logo-symbol.png'
          />
        </div>
        <p className={cx('welcome')}>환영합니다.</p>
        <p className={cx('congratulations')}>
          {nickName} 님 가입을 축하드립니다.
        </p>
      </div>

      <button type='button' className={cx('btn', 'btn-bottom')}>
        주문하러 가기
      </button>
    </div>
  );
}

export default signUpComplate;
