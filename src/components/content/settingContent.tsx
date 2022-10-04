/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/settingContent.module.scss';

interface IInfo {
  isDarkmode?: boolean;
  pushNotificationAgreement?: boolean;
  advertisementAgreement?: boolean;
  useLocationInfoAgreement?: boolean;
  shakeToPay?: boolean;
}

function settingContent() {
  const [info, setInfo] = useState<IInfo>();
  const [isFetching, setIsFetching] = useState(false);
  const cx = classNames.bind(styles);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (info === undefined && token) {
      axios
        .get('http://121.145.206.143:8000/api/user-service/optionalInfo', {
          headers: {
            Authorization: JSON.parse(token),
          },
        })
        .then((res: any) => {
          setInfo(res.data.data);
          setIsFetching(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const check = e.target.checked;
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .patch(
          `http://121.145.206.143:8000/api/user-service/optionalInfo/${value}`,
          null,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          },
        )
        .then((res: any) => {
          console.log(res);
          setInfo({ ...info, [value]: check });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className={cx('wrap')}>
      <h2>설정</h2>
      {isFetching && (
        <ul className={cx('setting-li-wrap')}>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>푸쉬 알림</label>
            <div className={cx('toggle-wrap')}>
              <input
                type='checkbox'
                defaultChecked={info?.pushNotificationAgreement}
                onChange={handleChangeOption}
                value='pushNotification'
              />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>프로모션/이벤트 알림 수신</label>
            <div className={cx('toggle-wrap')}>
              <input
                type='checkbox'
                defaultChecked={info?.advertisementAgreement}
                onChange={handleChangeOption}
                value='advertisement'
              />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>위치 정보 서비스 이용약관 동의</label>
            <div className={cx('toggle-wrap')}>
              <input
                type='checkbox'
                defaultChecked={info?.useLocationInfoAgreement}
                onChange={handleChangeOption}
                value='location'
              />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>Shake to pay 설정</label>
            <div className={cx('toggle-wrap')}>
              <input
                type='checkbox'
                defaultChecked={info?.shakeToPay}
                onChange={handleChangeOption}
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
                defaultChecked={info?.isDarkmode}
                onChange={handleChangeOption}
                value='darkmode'
              />
              <div className={cx('toggle')} />
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default settingContent;
