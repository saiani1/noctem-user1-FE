import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../styles/common/agreement.module.scss';
import { IAgreeData } from '../../types/signUp.d';

const cx = classNames.bind(styles);

function agreementList({
  agreeData,
  handleCheckOption,
}: {
  agreeData: IAgreeData;
  handleCheckOption: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label htmlFor='all_agr' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='all_agr'
          id='all_agr'
          className={cx('agree-input')}
          onChange={handleCheckOption}
          checked={agreeData.all_agr}
        />
        <span>약관 전체 동의</span>
      </label>

      <label htmlFor='agr1_use' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='agr1_use'
          id='agr1_use'
          className={cx('agree-input')}
          onChange={handleCheckOption}
          checked={agreeData.agr1_use}
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

      <label htmlFor='agr2_info' className={cx('agree-label')}>
        <input
          type='checkbox'
          name='agr2_info'
          id='agr2_info'
          className={cx('agree-input')}
          onChange={handleCheckOption}
          checked={agreeData.agr2_info}
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

      <label htmlFor='agr3_ad' className={cx('agree-label', 'ad-agree-label')}>
        <input
          type='checkbox'
          name='agr3_ad'
          id='agr3_ad'
          className={cx('agree-input')}
          onChange={handleCheckOption}
          checked={agreeData.agr3_ad}
        />
        <div className={cx('desc-wrap')}>
          <span>E-mail 및 SMS 광고성 정보 수신동의(선택)</span>
          <span className={cx('sub-desc')}>
            다양한 프로모션 소식 및 신규 매장 정보를 보내드립니다.
          </span>
        </div>
      </label>
    </>
  );
}

export default agreementList;
