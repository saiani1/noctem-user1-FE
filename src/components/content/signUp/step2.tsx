import React, { useState, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../../../../styles/content/signUp/step2.module.scss';
import { IChkSuccess, IError, IStep2Props } from '../../../types/signUp.d';

const cx = classNames.bind(styles);

const ifFunc = (
  condition: boolean,
  then: JSX.Element,
  otherwise: JSX.Element,
) => {
  return condition ? then : otherwise;
};

function isName(value: string) {
  const regExp = /^[가-힣]{2}$/;
  return regExp.test(value);
}

function isNickName(value: string) {
  const regExp = /^[가-힣]{2,8}$/;
  return regExp.test(value);
}

// function isResiNum(value: string) {
//   const regExp = /(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))/;
//   return regExp.test(value);
// }

// function isGender(value: string) {
//   const regExp = /[1-4]/;
//   return regExp.test(value);
// }

// function isEmail(value: string) {
//   const regExp =
//     /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//   return regExp.test(value);
// }

// function isPassword(value: string) {
//   const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,40}$/;
//   return regExp.test(value);
// }

function step2({
  agreeData,
  inputData,
  setInputData,
  setStep,
}: {
  agreeData: IStep2Props['agreeData'];
  inputData: IStep2Props['inputData'];
  setInputData: IStep2Props['setInputData'];
  setStep: IStep2Props['setStep'];
}) {
  // console.log(agreeData);
  // console.log(inputData);
  // console.log(setInputData);
  // console.log(setStep);
  const nameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [chkSuccess, setChkSuccess] = useState<IChkSuccess>({
    nickName: false,
    email: false,
  });
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
    let isError = false;
    console.log(target.name);

    if (target.name === 'name') {
      if (!isName(target.value)) {
        isError = true;
      } else {
        isError = false;
      }
    }

    if (target.name === 'nickName') {
      if (!isNickName(target.value)) {
        isError = true;
      } else {
        isError = false;
      }
    }

    if (
      target.name === 'birth' &&
      target.value.length === 6 &&
      genderRef.current?.value.length === 0
    ) {
      genderRef.current?.focus();
    }

    if (isError) {
      setError({
        ...error,
        [target.name]: true,
      });
    } else {
      setError({
        ...error,
        [target.name]: false,
      });
    }
  };

  const handleDuplChk = (name: string) => {
    console.log('중복 체크', name);
    const type = name === 'email' ? 'email' : 'nickname';
    const value =
      name === 'email' ? emailRef.current?.value : nickNameRef.current?.value;
    console.log(type, value);

    if (value && isNickName(value)) {
      console.log('요청 O');
      console.log(
        `http://121.145.206.143:8000/api/user-service/duplicationCheck/${type}/${value}`,
      );
      axios
        .get(
          `http://121.145.206.143:8000/api/user-service/duplicationCheck/${type}/${value}`,
        )
        .then(res => {
          if (res.data.data) {
            // 중복임
            console.log('중복임');
            setChkSuccess({
              ...chkSuccess,
              nickName: false,
            });
          } else {
            // 중복 아님
            console.log('중복아님');
            setChkSuccess({
              ...chkSuccess,
              nickName: true,
            });
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      console.log('요청 X');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pwVal = passwordRef.current?.value;
    const pwCfmVal = passwordConfirmRef.current?.value;

    // if (pwVal && pwVal.length !== 0) {
    //   if (pwVal !== pwCfmVal) {
    //   } else {
    //   }
    // }

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
            required
          />
          {error.name && (
            <p className={cx('error')}>
              이름에는 숫자와 영문, 공백이 들어갈 수 없습니다.
            </p>
          )}
        </div>

        {/* 닉네임 */}
        <div className={cx('input-wrap')}>
          <div className={cx('nickName-wrap')}>
            <input
              type='text'
              name='nickName'
              id='nickName'
              className={cx('input', 'nickName')}
              placeholder='닉네임 (한글 8자리 이내)'
              minLength={2}
              maxLength={8}
              ref={nickNameRef}
              onChange={handleInputChange}
              required
            />
            <button
              type='button'
              onClick={() => {
                handleDuplChk('nickName');
              }}
              className={cx('btn-dupl-chk')}
            >
              중복확인
            </button>
          </div>
          {error.nickName && (
            <p className={cx('error')}>닉네임은 2~8자리의 한글입니다.</p>
          )}
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
              onClick={() => {
                handleDuplChk('email');
              }}
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
