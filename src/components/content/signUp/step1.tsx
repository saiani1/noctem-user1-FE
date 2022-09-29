import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../../styles/content/signUp/step1.module.scss';
import AgreementList from '../../common/agreementList';
import { IStep1Props } from '../../../types/signUp.d';

const cx = classNames.bind(styles);

function step1({
  agreeData,
  setAgreeData,
  setStep,
}: {
  agreeData: IStep1Props['agreeData'];
  setAgreeData: IStep1Props['setAgreeData'];
  setStep: IStep1Props['setStep'];
}) {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const handleCheckOption = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.checked === true) {
      // 체크했을 때
      if (target.name === 'all_agr') {
        // 전체 선택일 경우
        setNextStep(true);
        setAgreeData({
          all_agr: true,
          agr1_use: true,
          agr2_info: true,
          agr3_ad: true,
        });
      } else {
        // 각각 선택일 경우
        setAgreeData({
          ...agreeData,
          all_agr: false,
          [target.name]: true,
        });
        if (target.name === 'agr1_use') {
          if (agreeData.agr2_info) setNextStep(true);
        } else if (target.name === 'agr2_info') {
          if (agreeData.agr1_use) setNextStep(true);
        }
      }
    } else if (target.name === 'all_agr') {
      // 체크 해제했을 때, 전체 선택일 경우
      setNextStep(false);
      setAgreeData({
        all_agr: false,
        agr1_use: false,
        agr2_info: false,
        agr3_ad: false,
      });
    } else {
      // 체크 해제했을 때, 각각 선택일 경우
      setAgreeData({
        ...agreeData,
        all_agr: false,
        [target.name]: false,
      });
      if (target.name === 'agr1_use' || target.name === 'agr2_info') {
        setNextStep(false);
      }
    }
  };

  const handleNextStep = () => {
    if (nextStep) {
      setStep({
        step1: false,
        step2: true,
        step3: false,
      });
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <div className={cx('logo-wrap')}>
        <Image
          src='/assets/images/png/logo-symbol.png'
          alt='logo symbol'
          width={80}
          height={100}
        />
      </div>
      <div className={cx('welcome')}>
        고객님
        <br />
        환영합니다!
      </div>
      <div>회원가입을 위해 약관에 동의해 주세요.</div>

      {/* 약관동의 */}
      <div className={cx('agreement-wrap')}>
        <AgreementList
          agreeData={agreeData}
          handleCheckOption={handleCheckOption}
        />
      </div>

      <button
        type='button'
        className={cx('btn', 'btn-bottom', nextStep ? '' : 'btn-disable')}
        onClick={handleNextStep}
      >
        다음
      </button>
    </>
  );
}

export default step1;
