/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../styles/pages/myPage.module.scss';
import Header from '../src/components/common/header';
import ToolbarList from '../src/components/ui/toolbarList';

function myPage() {
  const cx = classNames.bind(styles);

  return (
    <>
      <Header isClose={false} isBack />
      <div className={cx('wrap')}>
        <h2>My Page</h2>
        <p className={cx('welcome-msg')}>
          <strong>녹템</strong>님<br />
          환영합니다! 🙌
        </p>
        <ul className={cx('menu-btn-li-wrap')}>
          <li className={cx('menu-btn-li')}>
            <button type='button'>
              <Image
                src='/assets/svg/icon-moon-and-stars.svg'
                width={35}
                height={35}
              />
              <span>등급 히스토리</span>
            </button>
          </li>
          <li className={cx('menu-btn-li')}>
            <button type='button'>
              <Image
                src='/assets/svg/icon-receipt.svg'
                width={35}
                height={35}
              />
              <span>전자영수증</span>
            </button>
          </li>
          <li className={cx('menu-btn-li')}>
            <button type='button'>
              <Image src='/assets/svg/icon-mug.svg' width={35} height={35} />
              <span>나만의 메뉴</span>
            </button>
          </li>
          <li className={cx('menu-btn-li')}>
            <Link href='/userInfo'>
              <a className={cx('button')}>
                <Image src='/assets/svg/icon-user.svg' width={35} height={35} />
                <span>개인정보 관리</span>
              </a>
            </Link>
          </li>
          <li className={cx('menu-btn-li')}>
            <Link href='/setting'>
              <a className={cx('button')}>
                <Image
                  src='/assets/svg/icon-settings.svg'
                  width={35}
                  height={35}
                />
                <span>설정</span>
              </a>
            </Link>
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
                <Link href='/'>기프티콘 등록</Link>
              </li>
              <li>
                <Link href='/'>금액권 등록</Link>
              </li>
              <li>
                <Link href='/'>기프티콘 사용</Link>
              </li>
              <li>
                <Link href='/'>금액권 사용</Link>
              </li>
            </ul>
          </li>
          <li className={cx('menu-wrap')}>
            <h3>Order</h3>
            <ul className={cx('sub-menu-wrap')}>
              <li>
                <Link href='/'>장바구니</Link>
              </li>
              <li>
                <Link href='/'>주문내역</Link>
              </li>
            </ul>
          </li>
          <li className={cx('menu-wrap')}>
            <h3>고객지원</h3>
            <Link href='/'>
              <a className={cx('qna')}>문의사항</a>
            </Link>
          </li>
        </ul>
        <button type='button' className={cx('logout-btn')}>
          로그아웃
        </button>
      </div>
      <ToolbarList />
    </>
  );
}

export default myPage;
