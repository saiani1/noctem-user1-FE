import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../../styles/content/signUp/step2.module.scss';
import { IError, IStep2Props } from '../../../types/signUp.d';

const cx = classNames.bind(styles);

function step2({
  inputData,
  setInputData,
  setStep,
}: {
  inputData: IStep2Props['inputData'];
  setInputData: IStep2Props['setInputData'];
  setStep: IStep2Props['setStep'];
}) {
  console.log(inputData);
  const nameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<IError>({
    name: false,
    nickName: false,
    birth: false,
    gender: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(target.name);

    if (
      target.name === 'birth' &&
      target.value.length === 6 &&
      genderRef.current?.value.length === 0
    ) {
      genderRef.current?.focus();
    }
  };

  const handleNickNameChk = () => {
    console.log('중복 체크');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('서브밋');
  };

  return (
    <div className={cx('content-wrap')}>
      <div className={cx('title')}>
        가입을 위해
        <br />
        정보를 입력해 주세요.
      </div>

      <form onSubmit={handleSubmit}>
        {/* 이름 */}
        <div className={cx('input-wrap')}>
          <input
            type='text'
            name='name'
            id='name'
            className={cx('input', 'name', 'error')}
            placeholder='이름'
            ref={nameRef}
            onChange={handleInputChange}
            required
          />
          {error.name && <p className={cx('error')}>이름 error</p>}
        </div>

        {/* 닉네임 */}
        <div className={cx('input-wrap')}>
          <div className={cx('nickName-wrap')}>
            <input
              type='text'
              name='nickName'
              id='nickName'
              className={cx('input', 'nickName', 'error')}
              placeholder='닉네임 (한글 8자리 이내)'
              minLength={2}
              maxLength={8}
              ref={nickNameRef}
              onChange={handleInputChange}
              required
            />
            <button
              type='button'
              onClick={handleNickNameChk}
              className={cx('btn-dupl-chk')}
            >
              중복확인
            </button>
          </div>
          {error.nickName && <p className={cx('error')}>닉네임 error</p>}
        </div>

        {/* 생년월일 / 성별 */}
        <div className={cx('input-wrap')}>
          <div className={cx('birt-wrap')}>
            <input
              type='text'
              name='birth'
              id='birth'
              className={cx('input')}
              placeholder='생년월일 6자리'
              minLength={6}
              maxLength={6}
              ref={birthRef}
              onChange={handleInputChange}
              required
            />
            <span className={cx('bar')}>ㅡ</span>
            <input
              type='text'
              name='gender'
              id='gender'
              className={cx('input', 'gender')}
              maxLength={1}
              ref={genderRef}
              onChange={handleInputChange}
              required
            />
          </div>
          {error.birth && <p className={cx('error')}>생년월일 성별 error</p>}
        </div>

        {/* 이메일 */}
        <div className={cx('input-wrap')}>
          <div className={cx('email-wrap')}>
            <input
              type='email'
              name='email'
              id='email'
              className={cx('input')}
              placeholder='이메일'
              ref={emailRef}
              onChange={handleInputChange}
              required
            />
            <button
              type='button'
              onClick={handleNickNameChk}
              className={cx('btn-dupl-chk')}
            >
              중복확인
            </button>
          </div>
          {error.email && <p className={cx('error')}>이메일 error</p>}
        </div>

        {/* 비밀번호 */}
        <div className={cx('input-wrap')}>
          <input
            type='password'
            name='password'
            id='password'
            className={cx('input')}
            minLength={8}
            placeholder='비밀번호'
            ref={passwordRef}
            onChange={handleInputChange}
            required
          />
          {error.password && <p className={cx('error')}>비밀번호 error</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className={cx('input-wrap')}>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            className={cx('input')}
            placeholder='비밀번호 확인'
            ref={passwordConfirmRef}
            onChange={handleInputChange}
            required
          />
          {error.passwordConfirm && (
            <p className={cx('error')}>비밀번호 error</p>
          )}
        </div>

        <button type='submit' className={cx('btn')}>
          가입하기
        </button>
      </form>
    </div>
  );
}

export default step2;
