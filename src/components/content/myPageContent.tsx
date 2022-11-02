import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../../styles/content/myPageContent.module.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { nicknameState, tokenState } from '../../store/atom/userStates';
import { getUserInfo } from '../../../src/store/api/user';
import { confirmAlert } from 'react-confirm-alert';
import CustomAlert from './../customAlert';
import { loginState } from './../../store/atom/userStates';
import { orderInfoState, orderStatusState } from '../../store/atom/orderState';
import {
  MugBtn,
  MyRewardBtn,
  ReceiptBtn,
  SettingBtn,
  UserBtn,
} from '../../../public/assets/svg';

function myPageContent() {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const [, setOrderInfo] = useRecoilState(orderInfoState);
  const [, setOrderStatus] = useRecoilState(orderStatusState);
  const [isFatching, setIsFatching] = useState(false);
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const onLogin = () => {
    router.push('/login');
  };

  const handleComingSoon = () => {
    toast('준비 중인 서비스입니다!', {
      icon: '📢',
    });
  };

  const handleMyPage = (link: string) => {
    if (!isLogin) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <CustomAlert
            title='로그인'
            desc='로그인이 필요한 서비스입니다. 로그인 하시겠습니까?'
            btnTitle='로그인'
            // id={}
            onAction={onLogin}
            onClose={onClose}
          />
        ),
      });
    } else {
      router.push(link);
    }
  };

  const handleLogout = () => {
    if (isLogin) {
      setToken('');
      setIsLogin(false);
      setOrderInfo({
        // api 요청한 값으로 수정
        storeId: 0,
        purchaseId: 0,
      });
      setOrderStatus('');
      setNickname('게스트');
      toast.success('로그아웃 되셨습니다.');
      router.push('/');
    }
  };

  useEffect(() => {
    if (isLogin) {
      getUserInfo(token).then(res => {
        setNickname(res.data.data.nickname);
      });
      setIsFatching(true);
    } else {
      setIsFatching(false);
    }
  }, []);

  return (
    <div className={cx('wrap')}>
      <h2>My Page</h2>
      {isFatching ? (
        <p className={cx('welcome-msg')}>
          <strong>{nickname}</strong> 님<br />
          환영합니다! 🙌
        </p>
      ) : (
        <div className={cx('info-wrap')}>
          <div className={cx('info')}>
            로그인 하여 모든 서비스를 이용해 보세요!
          </div>
          <div className={cx('btn-box')}>
            <button
              className={cx('btn', 'signUp-btn')}
              onClick={() => {
                router.push('/signUp');
              }}
            >
              회원가입
            </button>
            <button
              className={cx('btn', 'login-btn')}
              onClick={() => {
                router.push('/login');
              }}
            >
              <Link href='/login'>로그인</Link>
            </button>
          </div>
        </div>
      )}

      <ul className={cx('menu-btn-li-wrap')}>
        <li className={cx('menu-btn-li')}>
          <button
            onClick={() => {
              handleMyPage('/rewards');
            }}
          >
            <MyRewardBtn className={cx('icon')} />
            <span>등급 조회</span>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <button onClick={handleComingSoon}>
            <ReceiptBtn className={cx('icon')} />
            <span>주문내역</span>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <button
            onClick={() => {
              handleMyPage('/myMenu');
            }}
          >
            <a className={cx('button')}>
              <MugBtn className={cx('icon')} />
              <span>나만의 메뉴</span>
            </a>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <button
            onClick={() => {
              handleMyPage('/userInfo');
            }}
          >
            <a className={cx('button')}>
              <UserBtn className={cx('icon')} />
              <span>개인정보 관리</span>
            </a>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <button
            onClick={() => {
              handleMyPage('/setting');
            }}
          >
            <a className={cx('button')}>
              <SettingBtn className={cx('icon')} />
              <span>설정</span>
            </a>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <Image
            src='/assets/images/png/logo-symbol.png'
            width={75}
            height={75}
          />
        </li>
      </ul>
      <button type='button' className={cx('logout-btn')} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default myPageContent;
