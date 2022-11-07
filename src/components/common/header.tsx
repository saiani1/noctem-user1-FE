import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';

import styles from '../../../styles/common/header.module.scss';
import { CloseBtn, LeftArrowBtn } from '../../../public/assets/svg';
import { loginState, tokenState } from '../../store/atom/userStates';
import { getIsDark } from '../../store/api/user';
import { shakeToPayState } from '../../store/atom/optionState';

const cx = classNames.bind(styles);
function shakeEventDidOccur() {
  //put your own code here etc.
  alert('shake!');
}

function header({ isClose, isBack }: { isClose: boolean; isBack: boolean }) {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const { theme, setTheme } = useTheme();
  const shakeState = useRecoilValue(shakeToPayState);

  const handleBack = () => {
    router.back();
  };
  var Shake = require('shake.js');

  useEffect(() => {
    if (isLogin) {
      getIsDark(token).then(res => {
        const resData = res.data.data;
        setTheme(resData === true ? 'dark' : 'light');
      });
    } else {
      setTheme('light');
    }
    var myShakeEvent = new Shake({
      threshold: 15,
      timeout: 1000,
    });

    if (shakeState === true) {
      myShakeEvent.start();
      window.addEventListener('shake', shakeEventDidOccur, false);
    }
  }, []);

  return (
    <div className={cx('header-wrap')}>
      <button
        type='button'
        onClick={handleBack}
        className={cx('header-back-arrow')}
      >
        {isClose && <CloseBtn className={cx('icon')} />}
        {isBack && <LeftArrowBtn className={cx('icon')} />}
      </button>
      <div className={cx('header-logo')}>
        <h1 className={cx('header-title')}>Cafe Noctem Order</h1>
        <Link href='/'>
          <a href='/'>
            <Image
              width={93}
              height={21}
              alt='logo title image'
              src={
                theme === 'dark'
                  ? '/assets/images/png/logo-title-darkmode.png'
                  : '/assets/images/png/logo-title.png'
              }
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default header;
