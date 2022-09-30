import React, { useState, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../../../../styles/content/signUp/step2.module.scss';
import {
  IStep2Props,
  IValid,
  IError,
  IDuplValid,
} from '../../../types/signUp.d';

const cx = classNames.bind(styles);

function isName(value: string) {
  const regExp = /^[가-힣]{2,}$/;
  return regExp.test(value);
}

function isNickName(value: string) {
  const regExp = /^[가-힣]{2,8}$/;
  return regExp.test(value);
}

function isResiNum(value: string) {
  const regExp = /(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))/;
  return regExp.test(value);
}

function isGender(value: string) {
  const regExp = /[1-4]/;
  return regExp.test(value);
}

function isEmail(value: string) {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(value);
}

function isPassword(value: string) {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,40}$/;
  return regExp.test(value);
}

function step2({
  agreeData,
  setStep,
}: {
  agreeData: IStep2Props['agreeData'];
  setStep: IStep2Props['setStep'];
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [valid, setValid] = useState<IValid>({
    name: false,
    nickname: false,
    birth: false,
    gender: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });
  const [duplValid, setDuplValid] = useState<IDuplValid>({
    nickname: false,
    email: false,
  });
  const [error, setError] = useState<IError>({
    name: '',
    nickname: '',
    birth: '',
    gender: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let isError = false;
    let errMsg = '';

    if (target.name === 'name') {
      if (!isName(target.value)) {
        isError = true;
        errMsg = '숫자와 영문, 공백이 들어갈 수 없습니다.';
      } else {
        isError = false;
      }
    }

    if (target.name === 'nickname') {
      if (!isNickName(target.value)) {
        isError = true;
        errMsg = '2~8자리의 한글을 입력해 주세요.';
        setDuplValid({
          ...duplValid,
          nickname: false,
        });
      } else {
        isError = false;
      }
    }

    if (target.name === 'birth') {
      if (!isResiNum(target.value)) {
        isError = true;
        errMsg = '정확한 값을 입력해 주세요.';
      } else {
        isError = false;
      }
    }

    if (target.name === 'gender') {
      if (!isGender(target.value)) {
        isError = true;
        errMsg = '정확한 값을 입력해 주세요.';
      } else {
        isError = false;
      }
    }

    if (target.name === 'email') {
      if (!isEmail(target.value)) {
        isError = true;
        errMsg = '이메일 형식이 옳지 않습니다.';
        setDuplValid({
          ...duplValid,
          email: false,
        });
      } else {
        isError = false;
      }
    }

    if (target.name === 'password') {
      console.log('비번 변경');
      if (!isPassword(target.value)) {
        isError = true;
        errMsg = '8~40자리의 영문과 숫자를 입력해 주세요.';
      } else {
        isError = false;
      }
    }

    if (target.name === 'passwordConfirm') {
      if (
        passwordConfirmRef.current?.value.length !== 0 &&
        passwordConfirmRef.current?.value !== passwordRef.current?.value
      ) {
        isError = true;
        errMsg = '비밀번호가 일치하지 않습니다.';
      } else {
        isError = false;
      }
    }

    if (isError) {
      setValid({
        ...valid,
        [target.name]: false,
      });
      setError({
        ...error,
        [target.name]: errMsg,
      });
    } else {
      setValid({
        ...valid,
        [target.name]: true,
      });
      setError({
        ...error,
        [target.name]: '',
      });
    }

    if (
      target.name === 'birth' &&
      target.value.length === 6 &&
      genderRef.current?.value.length === 0
    ) {
      genderRef.current?.focus();
    }
  };

  const handleDuplChk = (name: string) => {
    console.log('중복 체크', name);
    const value =
      name === 'email' ? emailRef.current?.value : nicknameRef.current?.value;
    const errMsg =
      name === 'email' ? '중복된 이메일입니다.' : '중복된 닉네임입니다.';
    const successMsg =
      name === 'email'
        ? '사용 가능한 이메일입니다.'
        : '사용 가능한 닉네임입니다.';

    if (value && (name === 'email' ? isEmail(value) : isNickName(value))) {
      console.log('요청 O');
      console.log(
        `http://121.145.206.143:8000/api/user-service/duplicationCheck/${name}/${value}`,
      );
      axios
        .get(
          `http://121.145.206.143:8000/api/user-service/duplicationCheck/${name}/${value}`,
        )
        .then(res => {
          if (res.data.data) {
            // 중복임
            setDuplValid({
              ...duplValid,
              [name]: false,
            });
            setError({
              ...error,
              [name]: errMsg,
            });
            if (name === 'email') {
              emailRef.current?.focus();
            } else {
              nicknameRef.current?.focus();
            }
          } else {
            // 중복 아님
            setDuplValid({
              ...duplValid,
              [name]: true,
            });
            setError({
              ...error,
              [name]: successMsg,
            });
          }
        });
    } else {
      console.log('요청 X');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nameRef.current?.value.length === 0 ||
      (nameRef.current && !isName(nameRef.current?.value))
    ) {
      setError({
        ...error,
        name: '값을 입력해 주세요.',
      });
      nameRef.current?.focus();
      return;
    }

    if (nicknameRef.current?.value.length === 0) {
      setError({
        ...error,
        nickname: '값을 입력해 주세요.',
      });
      nicknameRef.current?.focus();
      return;
    }

    if (!duplValid.nickname) {
      setError({
        ...error,
        nickname: '중복 확인이 필요합니다.',
      });
      nicknameRef.current?.focus();
      return;
    }

    if (
      birthRef.current?.value.length === 0 ||
      (birthRef.current && !isResiNum(birthRef.current?.value))
    ) {
      setError({
        ...error,
        birth: '값을 입력해 주세요.',
      });
      birthRef.current?.focus();
      return;
    }

    if (
      genderRef.current?.value.length === 0 ||
      (genderRef.current && !isGender(genderRef.current?.value))
    ) {
      setError({
        ...error,
        gender: '값을 입력해 주세요.',
      });
      genderRef.current?.focus();
      return;
    }

    if (
      emailRef.current?.value.length === 0 ||
      (emailRef.current && !isEmail(emailRef.current?.value))
    ) {
      setError({
        ...error,
        email: '값을 입력해 주세요.',
      });
      emailRef.current?.focus();
      return;
    }

    if (!duplValid.email) {
      setError({
        ...error,
        email: '중복 확인이 필요합니다.',
      });
      emailRef.current?.focus();
      return;
    }

    if (
      passwordRef.current?.value.length === 0 ||
      (passwordRef.current && !isPassword(passwordRef.current?.value))
    ) {
      setError({
        ...error,
        password: '값을 입력해 주세요.',
      });
      passwordRef.current?.focus();
      return;
    }

    if (passwordConfirmRef.current?.value.length === 0) {
      setError({
        ...error,
        passwordConfirm: '값을 입력해 주세요.',
      });
      passwordConfirmRef.current?.focus();
      return;
    } else {
      if (passwordConfirmRef.current?.value !== passwordRef.current?.value) {
        setError({
          ...error,
          passwordConfirm: '비밀번호가 일치하지 않습니다.',
        });
        passwordConfirmRef.current?.focus();
        return;
      }
    }

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
            className={cx('input', 'name')}
            placeholder='이름'
            ref={nameRef}
            onChange={handleInputChange}
          />
          <p className={cx('error')}>{error.name}</p>
        </div>

        {/* 닉네임 */}
        <div className={cx('input-wrap')}>
          <div className={cx('nickname-wrap')}>
            <input
              type='text'
              name='nickname'
              id='nickname'
              className={cx('input', 'nickname')}
              placeholder='닉네임 (한글 8자리 이내)'
              minLength={2}
              maxLength={8}
              ref={nicknameRef}
              onChange={handleInputChange}
            />
            <button
              type='button'
              onClick={() => {
                handleDuplChk('nickname');
              }}
              className={cx('btn-dupl-chk')}
            >
              중복확인
            </button>
          </div>
          <p className={cx('error', duplValid.nickname && 'success')}>
            {error.nickname}
          </p>
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
            />
          </div>
          <p className={cx('error')}>{error.birth}</p>
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
            />
            <button
              type='button'
              onClick={() => {
                handleDuplChk('email');
              }}
              className={cx('btn-dupl-chk')}
            >
              중복확인
            </button>
          </div>
          <p className={cx('error', duplValid.email && 'success')}>
            {error.email}
          </p>
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
          />
          <p className={cx('error')}>{error.password}</p>
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
          />
          <p className={cx('error')}>{error.passwordConfirm}</p>
        </div>

        <button
          type='submit'
          className={cx('btn', nextStep ? '' : 'btn-disable')}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}

export default step2;
