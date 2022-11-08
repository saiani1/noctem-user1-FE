import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from '../../../styles/content/login.module.scss';
import { login } from '../../../src/store/api/login';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { loginState, tokenState } from '../../store/atom/userStates';
import {
  orderInfoState,
  orderProductDataState,
} from '../../store/atom/orderState';
import { getProgressOrder } from '../../store/api/order';

const cx = classNames.bind(styles);

function loginContent() {
  const router = useRouter();
  const [, setIsLogin] = useRecoilState(loginState);
  const [, setToken] = useRecoilState(tokenState);
  const [, setOrderInfo] = useRecoilState(orderInfoState);
  const [, setOrderProductData] = useRecoilState(orderProductDataState);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleNotService = () => {
    toast('준비 중인 서비스입니다!', {
      icon: '📢',
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const emailValue = emailInputRef.current?.value || '';
    const passwordValue = passwordInputRef.current?.value || '';

    login(emailValue, passwordValue)
      .then(res => {
        toast(`환영합니다!`, {
          icon: '🙌',
        });
        setIsLogin(true);
        setToken(res.headers.authorization);

        getProgressOrder(res.headers.authorization).then(orderRes => {
          const orderProductData = orderRes.data.data;
          setOrderProductData(orderProductData);
        });

        router.back();
      })
      .catch(err => {
        const ERR: { [key: number]: boolean } = {
          2016: true,
          2017: true,
          2020: true,
        };
        let errCode: number = err.response.data.errorCode;
        if (ERR[errCode]) {
          toast.error(
            '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
          );
          emailInputRef.current?.focus();
        }
      });
  };

  return (
    <div className={cx('wrap')}>
      <h2>Login</h2>
      <div className={cx('logo-wrap')}>
        <img
          src='/assets/images/png/logo-symbol.png'
          alt='logo symbol'
          width={100}
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
          <button type='button' onClick={handleNotService}>
            이메일 찾기
          </button>
          <button type='button' onClick={handleNotService}>
            비밀번호 찾기
          </button>
          <button type='button' onClick={() => router.push('/signUp')}>
            회원가입
          </button>
        </div>
        <button type='submit' className={cx('login-button')}>
          로그인 하기
        </button>
      </form>
    </div>
  );
}

export default loginContent;
