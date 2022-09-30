import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../../styles/content/signUp/signUpComplate.module.scss';

const cx = classNames.bind(styles);

function signUpComplate({ nickname }: { nickname: string }) {
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
          <span className={cx('nickname')}>{nickname}</span> 님 가입을
          축하드립니다!
        </p>
      </div>

      <button
        type='button'
        className={cx('btn', 'btn-bottom')}
        onClick={() => {}}
      >
        주문하러 가기
      </button>
    </div>
  );
}

export default signUpComplate;
