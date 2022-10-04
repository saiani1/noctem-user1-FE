import React, { useRef } from 'react';
import Router from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from '../../../styles/content/login.module.scss';

const cx = classNames.bind(styles);

function loginContent() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const emailValue = emailInputRef.current?.value;
    const passwordValue = passwordInputRef.current?.value;

    axios
      .post('${process.env.NEXT_PUBLIC_USER_BASE_URL}/login', {
        email: emailValue,
        password: passwordValue,
      })
      .then((res: any) => {
        localStorage.setItem(
          'token',
          JSON.stringify(res.headers.authorization),
        );
        Router.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={cx('wrap')}>
      <h2>Login</h2>
      <div className={cx('logo-wrap')}>
        <Image
          src='/assets/images/png/logo-symbol.png'
          alt='logo symbol'
          width={80}
          height={100}
        />
      </div>
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

      <form onSubmit={handleSubmit} noValidate>
        <input
          type='email'
          name='email'
          placeholder='이메일'
          className={cx('input')}
          ref={emailInputRef}
        />
        <input
          type='password'
          name='password'
          placeholder='비밀번호'
          className={cx('input')}
          ref={passwordInputRef}
        />
        <div className={cx('link-box')}>
          <Link href='/'>이메일 찾기</Link>
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
