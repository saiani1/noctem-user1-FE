/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames/bind';

import styles from '../styles/pages/setting.module.scss';
import Header from '../src/components/common/header';

function setting() {
  const cx = classNames.bind(styles);

  return (
    <>
      <Header isClose isBack={false} />
      <div className={cx('wrap')}>
        <h2>설정</h2>
        <ul className={cx('setting-li-wrap')}>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>푸쉬 알림</label>
            <div className={cx('toggle-wrap')}>
              <input type='checkbox' />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>프로모션/이벤트 알림 수신</label>
            <div className={cx('toggle-wrap')}>
              <input type='checkbox' />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>위치 정보 서비스 이용약관 동의</label>
            <div className={cx('toggle-wrap')}>
              <input type='checkbox' />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>Shake to pay 설정</label>
            <div className={cx('toggle-wrap')}>
              <input type='checkbox' />
              <div className={cx('toggle')} />
            </div>
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>다크모드</label>
            <div className={cx('toggle-wrap')}>
              <input type='checkbox' />
              <div className={cx('toggle')} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default setting;
