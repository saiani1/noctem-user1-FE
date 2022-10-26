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

function myPageContent() {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const [isFatching, setIsFatching] = useState(false);
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const onLogin = () => {
    router.push('/login');
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
            <a className={cx('button')}>
              <Image
                src='/assets/svg/icon-my-reward.svg'
                width={35}
                height={35}
              />
              <span>등급 조회</span>
            </a>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <button
            onClick={() => {
              // handleMyPage('');
              toast('준비 중인 서비스입니다.', {
                icon: '📢',
              });
            }}
          >
            <Image src='/assets/svg/icon-receipt.svg' width={35} height={35} />
            <span>전자영수증</span>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <button
            onClick={() => {
              handleMyPage('/myMenu');
            }}
          >
            <a className={cx('button')}>
              <Image src='/assets/svg/icon-mug.svg' width={35} height={35} />
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
              <Image src='/assets/svg/icon-user.svg' width={35} height={35} />
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
              <Image
                src='/assets/svg/icon-settings.svg'
                width={35}
                height={35}
              />
              <span>설정</span>
            </a>
          </button>
        </li>
        <li className={cx('menu-btn-li')}>
          <Image
            src='/assets/images/png/logo-symbol.png'
            width={61}
            height={75}
          />
        </li>
      </ul>
      <ul className={cx('menu-li-wrap')}>
        <li className={cx('menu-wrap')}>
          <h3>Gift</h3>
          <ul className={cx('sub-menu-wrap')}>
            <li>
              <Link href='/myPage'>기프티콘 등록</Link>
            </li>
            <li>
              <Link href='/myPage'>금액권 등록</Link>
            </li>
            <li>
              <Link href='/myPage'>기프티콘 사용</Link>
            </li>
            <li>
              <Link href='/myPage'>금액권 사용</Link>
            </li>
          </ul>
        </li>
        <li className={cx('menu-wrap')}>
          <h3>Order</h3>
          <ul className={cx('sub-menu-wrap')}>
            <li>
              <Link href='/cart'>장바구니</Link>
            </li>
            <li>
              <Link href='/myPage'>주문내역</Link>
            </li>
          </ul>
        </li>
        <li className={cx('menu-wrap')}>
          <h3>고객지원</h3>
          <Link href='/myPage'>
            <a className={cx('qna')}>문의사항</a>
          </Link>
        </li>
      </ul>

      <button type='button' className={cx('logout-btn')} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default myPageContent;
