import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../../styles/content/userInfoContent.module.scss';
import { getToken } from '../../store/utils/token';
import { getUserInfo } from '../../../src/store/api/user';
import {
  getDuplicationCheck,
  patchNickname,
} from '../../../src/store/api/signUp';

interface IInfo {
  email: string;
  name: string;
  sex: string;
  birthdayYear: string;
  birthdayMonth: string;
  birthdayDay: string;
  phoneNumber: string;
  nickname: string;
}

function userInfoContent() {
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState<IInfo>({
    email: '',
    name: '',
    sex: '',
    birthdayYear: '',
    birthdayMonth: '',
    birthdayDay: '',
    phoneNumber: '',
    nickname: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const cx = classNames.bind(styles);

  useEffect(() => {
    const token = getToken();

    if (token !== '{}') {
      getUserInfo().then(res => {
        console.log(res);
        setInfo(res.data.data);
      });
    }
  }, []);

  const isNickName = (value: string) => {
    const regExp = /^[가-힣]{2,8}$/;
    return regExp.test(value);
  };

  const handleDuplChk = () => {
    const nickValue = nicknameInputRef.current?.value;

    console.log(info?.nickname, nickValue);
    if (nickValue && info?.nickname !== nickValue && isNickName(nickValue)) {
      console.log(1);

      getDuplicationCheck('nickname', nickValue).then(res => {
        console.log(res);
        if (res.data.data) {
          setIsValid(false);
          setError('중복된 닉네임입니다.');
          nicknameInputRef.current?.focus();
        } else {
          setIsValid(true);
          setError('사용 가능한 닉네임입니다.');
        }
      });
    } else if (nickValue && !isNickName(nickValue)) {
      setIsValid(false);
      setError('2~8자리의 한글을 입력해 주세요.');
      nicknameInputRef.current?.focus();
    } else if (info?.nickname === nickValue || nickValue?.length === 0) {
      setIsValid(false);
      setError('변경할 닉네임을 입력해주세요.');
      nicknameInputRef.current?.focus();
    }
  };

  const handleSubmit = () => {
    console.log('서브밋');

    const nickValue = nicknameInputRef.current?.value || '';
    const token = getToken();

    if (isValid && token !== '{}') {
      patchNickname(nickValue).then(res => {
        if (res.data.data) {
          setInfo({
            ...info,
            nickname: nickValue,
          });
          toast.success('닉네임이 변경되었습니다.');
        } else {
          toast.error('닉네임 변경에 실패하였습니다.');
        }
      });
    } else if (!isValid) setError('닉네임 중복확인을 진행해주세요.');
  };

  return (
    <div className={cx('wrap')}>
      <h2>개인정보 관리</h2>
      <ul className={cx('user-info-wrap')}>
        <li className={cx('email-wrap')}>
          <h3>메일</h3>
          <span>{info?.email}</span>
        </li>
        <li className={cx('name-wrap')}>
          <h3>이름</h3>
          <div className={cx('name-info-wrap')}>
            <span>{info?.name}</span>
            <div className={cx('gender-wrap')}>
              <span className={cx(info?.sex === '여자' ? 'active' : '')}>
                여자
              </span>
              <span className={cx(info?.sex === '남자' ? 'active' : '')}>
                남자
              </span>
            </div>
          </div>
        </li>
        <li className={cx('birth-wrap')}>
          <h3>생년월일</h3>
          <span>
            {info?.birthdayYear}년 {info?.birthdayMonth}월 {info?.birthdayDay}일
          </span>
        </li>
        <li className={cx('phone-wrap')}>
          <h3>휴대폰</h3>
          <span>
            {info?.phoneNumber === null
              ? '휴대폰 번호를 등록해주세요.'
              : info?.phoneNumber}
          </span>
        </li>
        <li className={cx('nickname-wrap')}>
          <h3>닉네임</h3>
          <div className={cx('input-wrap')}>
            <input
              type='text'
              defaultValue={info?.nickname}
              ref={nicknameInputRef}
            />
            <button type='button' onClick={handleDuplChk}>
              중복확인
            </button>
          </div>
          {error && (
            <span className={cx('msg', !isValid ? 'err' : '')}>{error}</span>
          )}
        </li>
        <button type='button' className={cx('btn')} onClick={handleSubmit}>
          개인정보 수정
        </button>
        <button type='button' className={cx('withdrawal')}>
          회원탈퇴
        </button>
      </ul>
    </div>
  );
}

export default userInfoContent;
