import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { relative } from 'path';
import styles from '../../../../styles/content/signUp/step2.module.scss';

const cx = classNames.bind(styles);

function step2() {
  const nameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

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
        <input
          type='text'
          name='name'
          id='name'
          className={cx('input')}
          placeholder='이름'
          ref={nameRef}
          onChange={handleInputChange}
          required
        />

        {/* 닉네임 */}
        <input
          type='text'
          name='nickName'
          id='nickName'
          className={cx('input')}
          placeholder='닉네임 (한글 8자리 이내)'
          minLength={2}
          maxLength={8}
          ref={nickNameRef}
          onChange={handleInputChange}
          required
        />

        {/* 생년월일 / 성별 */}
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

        {/* 이메일 */}
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

        {/* 비밀번호 */}
        <input
          type='password'
          name='password'
          id='password'
          className={cx('input')}
          placeholder='비밀번호'
          ref={passwordRef}
          onChange={handleInputChange}
          required
        />

        {/* 비밀번호 확인 */}
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

        <button type='submit' className={cx('btn', 'btn-bottom')}>
          가입하기
        </button>
      </form>
    </div>
  );
}

export default step2;
