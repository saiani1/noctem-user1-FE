import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Step1 from './signUp/step1';
import Step2 from './signUp/step2';
import SignUpComplate from './signUp/signUpComplate';
import styles from '../../../styles/content/signUp.module.scss';
import { IStep } from '../../types/signUp.d';

const cx = classNames.bind(styles);

function signUpContent() {
  const [step, setStep] = useState<IStep>({
    step1: true,
    step2: false,
    step3: false,
  });

  return (
    <div className={cx('wrap', 'signup-wrap')}>
      {step.step1 && <Step1 />}
      {step.step2 && <Step2 />}
      {step.step3 && <SignUpComplate nickName='OOO' />}
    </div>
  );
}

export default signUpContent;
