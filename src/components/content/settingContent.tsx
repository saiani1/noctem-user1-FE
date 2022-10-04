/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/settingContent.module.scss';
import { getUserOptions } from '../../../pages/api/user';
import { useRouter } from 'next/router';
import { getToken } from './../../store/utils/token';

interface IInfo {
  value: string;
  isDarkmode: boolean;
  pushNotificationAgreement: boolean;
  advertisementAgreement: boolean;
  useLocationInfoAgreement: boolean;
  shakeToPay: boolean;
}

function settingContent() {
  const [info, setInfo] = useState<IInfo>();
  const cx = classNames.bind(styles);
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const token = getToken();

    if (info === undefined && token !== '{}') {
      getUserOptions().then(res => {
        console.log(res);
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
    }
  }, []);

  // const handleChangePush = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (info?.pushNotificationAgreement !== e.target.checked) {
  //     axios.patch()
  //   }
  // };
  // const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {};
  // const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {};
  // const handleChangeShake = (e: React.ChangeEvent<HTMLInputElement>) => {};
  // const handleChangeDark = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={cx('wrap')}>
      <h2>설정</h2>
      <ul className={cx('setting-li-wrap')}>
        <li className={cx('setting-li')}>
          <label htmlFor='push'>푸쉬 알림</label>
          <div className={cx('toggle-wrap')}>
            <input
              type='checkbox'
              checked={info?.pushNotificationAgreement}
              // onChange={handleChangePush}
              value='pushNotificationAgreement'
            />
            <div className={cx('toggle')} />
          </div>
        </li>
        <li className={cx('setting-li')}>
          <label htmlFor='push'>프로모션/이벤트 알림 수신</label>
          <div className={cx('toggle-wrap')}>
            <input
              type='checkbox'
              checked={info?.advertisementAgreement}
              // onChange={handleChangeEvent}
              value='advertisementAgreement'
            />
            <div className={cx('toggle')} />
          </div>
        </li>
        <li className={cx('setting-li')}>
          <label htmlFor='push'>위치 정보 서비스 이용약관 동의</label>
          <div className={cx('toggle-wrap')}>
            <input
              type='checkbox'
              checked={info?.useLocationInfoAgreement}
              // onChange={handleChangeLocation}
              value='useLocationInfoAgreement'
            />
            <div className={cx('toggle')} />
          </div>
        </li>
        <li className={cx('setting-li')}>
          <label htmlFor='push'>Shake to pay 설정</label>
          <div className={cx('toggle-wrap')}>
            <input
              type='checkbox'
              checked={info?.shakeToPay}
              // onChange={handleChangeShake}
              value='shakeToPay'
            />
            <div className={cx('toggle')} />
          </div>
        </li>
        <li className={cx('setting-li')}>
          <label htmlFor='push'>다크모드</label>
          <div className={cx('toggle-wrap')}>
            <input
              type='checkbox'
              checked={info?.isDarkmode}
              // onChange={handleChangeDark}
              value='isDarkmode'
            />
            <div className={cx('toggle')} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default settingContent;
