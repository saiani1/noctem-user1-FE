import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from '../styles/pages/userInfo.module.scss';
import Header from '../src/components/common/header';

function userInfo() {
  const [info, setInfo] = useState({});
  const cx = classNames.bind(styles);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      axios
        .get('http://121.145.206.143:8000/api/user-service/userAccount', {
          headers: {
            Authorization: JSON.parse(token),
          },
        })
        .then((res: any) => {
          setInfo(res.data.data);
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Header isClose isBack={false} />
      <div className={cx('wrap')}>
        <h2>개인정보 관리</h2>
        {/* <ul className={cx('user-info-wrap')}>
          <li className={cx('email-wrap')}>
            <h3>메일</h3>
            <span>{info.email}</span>
          </li>
          <li className={cx('name-wrap')}>
            <h3>이름</h3>
            <div className={cx('name-info-wrap')}>
              <span>{info.name}</span>
              <div className={cx('gender-wrap')}>
                <span className={cx('active')}>여자</span>
                <span>남자</span>
              </div>
            </div>
          </li>
          <li className={cx('birth-wrap')}>
            <h3>생년월일</h3>
            <span>
              {info.birthdayYear}년 {info.birthdayMonth}월 {info.birthdayDay}일
            </span>
          </li>
          <li className={cx('phone-wrap')}>
            <h3>휴대폰</h3>
            <span>
              {info.phoneNumber === null
                ? '휴대폰 번호를 등록해주세요.'
                : info.phoneNumber}
            </span>
          </li>
          <li className={cx('nickname-wrap')}>
            <h3>닉네임</h3>
            <div className={cx('input-wrap')}>
              <input type='text' defaultValue={info.nickname} />
              <button type='button'>중복확인 </button>
            </div>
          </li> */}
        <button type='button' className={cx('btn')}>
          개인정보 수정
        </button>
        <button type='button' className={cx('withdrawal')}>
          회원탈퇴
        </button>
        {/* </ul> */}
      </div>
    </>
  );
}

export default userInfo;
