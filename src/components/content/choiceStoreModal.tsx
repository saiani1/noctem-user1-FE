import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/choiceStoreModal.module.scss';

const cx = classNames.bind(styles);

function choiceStoreModal() {
  return (
    <>
      <div className={cx('wrap')}>
        <div className={cx('img-wrap')}>
          <Image
            src='/assets/images/jpg/centomdreamworld.jpg'
            alt='store1'
            width={2016}
            height={1512}
            layout='responsive'
            className={cx('img')}
          />
        </div>
        <div className={cx('tit-wrap')}>
          <h2>센텀드림월드</h2>
          <div className={cx('tit-address-wrap')}>
            <p>부산광역시 해운대구 센텀2로25, 센텀드림월드 1층 (우동)</p>
            <Image
              src='/assets/svg/icon-right-arrow.svg'
              alt='right arrow'
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className={cx('line')} />
        <div className={cx('time-wrap')}>
          <div className={cx('time-tit-wrap')}>
            <Image
              src='/assets/svg/icon-clock.svg'
              alt='clock'
              width={15}
              height={15}
            />
            <p>녹템 오더 운영 시간</p>
          </div>
          <div className={cx('time-sub-wrap')}>
            <Image
              src='/assets/svg/icon-down-line.svg'
              alt='next'
              width={13}
              height={13}
            />
            <span>
              <strong>카페</strong>07:00 - 21:30
            </span>
          </div>
        </div>
        <div className={cx('line')} />
        <div className={cx('location-wrap')}>
          <p>오시는 길</p>
          <span>센텀호텔 맞은 편 횡단보도 앞</span>
        </div>
        <Link href='/order'>매장 내 직접 수령</Link>
      </div>
    </>
  );
}

export default choiceStoreModal;
