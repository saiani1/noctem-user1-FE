import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../../styles/content/myPageContent.module.scss';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { nicknameState, tokenState } from '../../store/atom/userStates';
import { getUserInfo } from '../../../src/store/api/user';
import CustomAlert from './../customAlert';
import { loginState } from './../../store/atom/userStates';
import {
  orderInfoState,
  orderProductDataState,
} from '../../store/atom/orderState';
import {
  MugBtn,
  MyRewardBtn,
  ReceiptBtn,
  SettingBtn,
  UserBtn,
} from '../../../public/assets/svg';
import { randomMessage } from '../../../public/assets/datas/randomMessage';
import PopUp from '../ui/popUp';

function myPageContent() {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const [, setOrderInfo] = useRecoilState(orderInfoState);
  const [, setOrderProductData] = useRecoilState(orderProductDataState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [isFetching, setIsFetching] = useState(false);
  const [theme, setTheme] = useState('');
  const [open, setOpen] = useState(false);

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
      CustomAlert({
        title: '로그인',
        desc: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
        btnTitle: '로그인',
        id: 0,
        onAction: () => {
          onLogin();
        },
      });
    } else {
      router.push(link);
    }
  };

  const handleMessage = () => {
    const randomNumber = Math.floor(
      Math.random() * Math.floor(randomMessage.length),
    );
    toast(randomMessage[randomNumber], { icon: '🧙' });
  };

  const handleLogout = () => {
    if (isLogin) {
      setToken('');
      setIsLogin(false);
      setOrderInfo({
        storeId: 0,
        storeName: '',
        purchaseId: 0,
        orderNumber: '',
        turnNumber: 0,
        waitingTime: 0,
        state: '',
      });
      setOrderProductData([]);
      setNickname('게스트');
      toast.success('로그아웃 되셨습니다.');
      router.push('/');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isLogin) {
      getUserInfo(token).then(res => {
        setNickname(res.data.data.nickname);
      });
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
    const getTheme = String(localStorage.getItem('theme'));
    setTheme(getTheme);
  }, []);

  return (
    <>
      {open && <PopUp index={2} setOpen={setOpen} />}
      <div className={cx('wrap')}>
        <h2>My Page</h2>
        {isFetching ? (
          <p className={cx('welcome-msg')}>
            <strong>{nickname}</strong> 님<br />
            환영합니다! <span onClick={handleOpen}>🙌</span>
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
            <button onClick={handleMessage}>
              <img
                src={
                  theme === 'dark'
                    ? '/assets/images/png/noctem-dark.png'
                    : '/assets/images/png/noctem-light.png'
                }
                alt='녹템'
                className={cx('noctem')}
              />
            </button>
          </li>
        </ul>
        {isLogin && (
          <button
            type='button'
            className={cx('logout-btn')}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>
    </>
  );
}

export default myPageContent;
