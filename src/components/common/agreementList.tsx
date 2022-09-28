import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../styles/common/agreement.module.scss';

const cx = classNames.bind(styles);

function agreementList() {
  return (
    <>
      <label htmlFor='allChk' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='allChk'
          id='allChk'
          className={cx('agree-input')}
        />
        <span>약관 전체 동의</span>
      </label>
      <label htmlFor='serviceChk' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='serviceChk'
          id='serviceChk'
          className={cx('agree-input')}
        />
        <span>이용약관 동의(필수)</span>
        <div className={cx('more-wrap')}>
          <Image
            width={10}
            height={10}
            src='/assets/svg/icon-more.svg'
            alt='more'
          />
        </div>
      </label>
      <label htmlFor='pesonalInfoChk' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='pesonalInfoChk'
          id='pesonalInfoChk'
          className={cx('agree-input')}
        />
        <span>개인정보 수집 및 이용동의(필수)</span>
        <div className={cx('more-wrap')}>
          <Image
            width={10}
            height={10}
            src='/assets/svg/icon-more.svg'
            alt='more'
          />
        </div>
      </label>
      <label htmlFor='adChk' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='adChk'
          id='adChk'
          className={cx('agree-input')}
        />
        <span>E-mail 및 SMS 광고성 정보 수신동의(선택)</span>
      </label>
    </>
  );
}

export default agreementList;
