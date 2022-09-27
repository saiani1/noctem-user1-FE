import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from '../../../styles/content/login.module.scss';

const cx = classNames.bind(styles);

function loginContent() {
  return (
    <div className={cx('wrap', 'login-wrap')}>
      <h2>Login</h2>
      <Image
        src='/assets/images/png/logo-symbol.png'
        alt='logo symbol'
        width={80}
        height={100}
      />
      <div>
        <div className={cx('welcome')}>
          안녕하세요.
          <br />
          카페녹템입니다.
        </div>
        <div className={cx('desc')}>
          회원 서비스 이용을 위해 로그인 해주세요.
        </div>
      </div>

      <form>
        <input type='text' placeholder='아이디' className={cx('input')} />
        <input type='password' placeholder='비밀번호' className={cx('input')} />
        <div className={cx('link-box')}>
          <Link href='/'>아이디</Link>
          <Link href='/'>아이디 찾기</Link>
          <Link href='/'>비밀번호 찾기</Link>
          <Link href='/signUp'>회원가입</Link>
        </div>
        <button type='submit' className={cx('btn', 'btn-bottom')}>
          로그인 하기
        </button>
      </form>
    </div>
  );
}

export default loginContent;
