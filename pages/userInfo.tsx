import React from 'react';
import classNames from 'classnames/bind';

import styles from '../styles/pages/userInfo.module.scss';
import Header from '../src/components/common/header';

function userInfo() {
  const cx = classNames.bind(styles);

  return (
    <>
      <Header />
      <div className={cx('wrap')}>
        <h2>개인정보 관리</h2>
        <ul className={cx('user-info-wrap')}>
          <li className={cx('email-wrap')}>
            <h3>메일</h3>
            <span>ch*****@nate.com</span>
          </li>
          <li className={cx('name-wrap')}>
            <h3>이름</h3>
            <div className={cx('name-info-wrap')}>
              <span>최*정</span>
              <div className={cx('gender-wrap')}>
                <span className={cx('active')}>여자</span>
                <span>남자</span>
              </div>
            </div>
          </li>
          <li className={cx('birth-wrap')}>
            <h3>생년월일</h3>
            <span>****년 1월 1일</span>
          </li>
          <li className={cx('phone-wrap')}>
            <h3>휴대폰</h3>
            <span>010****1111</span>
          </li>
          <li className={cx('nickname-wrap')}>
            <h3>닉네임</h3>
            <div className={cx('input-wrap')}>
              <input type='text' defaultValue='멍멍이' />
              <button type='button'>중복확인 </button>
            </div>
          </li>
          <button type='button' className={cx('btn')}>
            개인정보 수정
          </button>
          <button type='button' className={cx('withdrawal')}>
            회원탈퇴
          </button>
        </ul>
      </div>
    </>
  );
}

export default userInfo;
