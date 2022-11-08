import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from '../../../styles/content/login.module.scss';
import { login } from '../../../src/store/api/login';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { loginState, tokenState } from '../../store/atom/userStates';
import {
  orderInfoState,
  orderProductDataState,
} from '../../store/atom/orderState';
import { IMenuList } from './../../types/order.d';
import {
  getLastSSEMessage,
  getProgressOrder,
  getWaitingInfo,
} from '../../store/api/order';

const cx = classNames.bind(styles);

function loginContent() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const [orderInfo, setOrderInfo] = useRecoilState(orderInfoState);
  const [, setOrderProductData] = useRecoilState(orderProductDataState);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const emailValue = emailInputRef.current?.value || '';
    const passwordValue = passwordInputRef.current?.value || '';

    login(emailValue, passwordValue)
      .then(res => {
        console.log('res', res);
        toast(`환영합니다!`, {
          icon: '🙌',
        });
        setIsLogin(true);
        setToken(res.headers.authorization);
        getOrderData(res.headers.authorization);

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

  function getOrderData(token: string) {
    getLastSSEMessage(token).then(res => {
      console.log('getLastSSEMessage res', res);
      const data = res.data.data;
      // console.log('data.data', data.orderStatus, data.purchaseId);

      // if (data.order)
      getProgressOrder(token).then(orderDataRes => {
        console.log('getProgressOrder', orderDataRes);
        const orderData = orderDataRes.data.data;
        setOrderProductData(orderData);
      });

      // getWaitingInfo(token).then(timeRes => {
      //   console.log('getWaitingInfo res', timeRes);
      //   const timeResData = timeRes.data.data;
      //   if (
      //     timeResData.orderNumber === null ||
      //     timeResData.turnNumber === null ||
      //     timeResData.waitingTime === null
      //   ) {
      //     console.log('timeResData', timeResData);
      //     // console.log('NULL orderInfo 덮어씌우기', {
      //     //   ...orderInfo,
      //     //   purchaseId: data.purchaseId,
      //     //   state: data.orderStatus,
      //     // });

      //     setOrderInfo({
      //       purchaseId: data.purchaseId,
      //       state: data.orderStatus,
      //       storeId: 1,
      //       storeName: '본점',
      //       orderNumber: '',
      //       turnNumber: 0,
      //       waitingTime: 0,
      //     });
      //   } else {
      //     setOrderInfo({
      //       storeId: 1,
      //       storeName: '본점',
      //       purchaseId: data.purchaseId,
      //       state: data.orderStatus,
      //       orderNumber: timeResData.orderNumber,
      //       turnNumber: timeResData.turnNumber,
      //       waitingTime: timeResData.waitingTime,
      //     });
      //   }
      // });
    });
  }

  useEffect(() => {
    if (isLogin && token !== '') {
    }
  }, [isLogin, token]);

  useEffect(() => {
    console.log('orderInfo', orderInfo);
  }, [orderInfo]);

  return (
    <div className={cx('wrap')}>
      <h2>Login</h2>
      <div className={cx('logo-wrap')}>
        <Image
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
          <Link href='/'>이메일 찾기</Link>
          <Link href='/'>비밀번호 찾기</Link>
          <Link href='/signUp'>회원가입</Link>
        </div>
        <button type='submit' className={cx('login-button')}>
          로그인 하기
        </button>
      </form>
    </div>
  );
}

export default loginContent;
