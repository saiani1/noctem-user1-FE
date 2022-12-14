import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Step1 from './signUp/step1';
import Step2 from './signUp/step2';
import SignUpComplete from './signUp/signUpComplete';
import styles from '../../../styles/content/signUp.module.scss';
import { IData, IStep } from '../../types/signUp.d';

const cx = classNames.bind(styles);

function signUpContent() {
  const [nickname, setNickname] = useState<string>('');
  const [agreeData, setAgreeData] = useState<IData['agreeData']>({
    all_agr: false,
    agr1_use: false,
    agr2_info: false,
    agr3_ad: false,
  });
  const [step, setStep] = useState<IStep>({
    step1: true,
    step2: false,
    step3: false,
  });

  return (
    <div className={cx('wrap', 'signup-wrap')}>
      {step.step1 && (
        <Step1
          agreeData={agreeData}
          setAgreeData={setAgreeData}
          setStep={setStep}
        />
      )}
      {step.step2 && (
        <Step2
          agreeData={agreeData}
          setNickname={setNickname}
          setStep={setStep}
        />
      )}
      {step.step3 && <SignUpComplete nickname={nickname} />}
    </div>
  );
}

export default signUpContent;
