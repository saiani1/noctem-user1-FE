import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

// import { ParkIcon } from '../../assets/svg/index';
import styles from '../../../styles/ui/storeInfo.module.scss';

function storeInfo() {
  const cx = classNames.bind(styles);

  return (
    <button type='button' className={cx('store-wrap')}>
      <div className={cx('img-wrap')}>
        <Image
          src='/assets/images/jpg/centomdreamworld.jpg'
          alt='센텀드림월드'
          width={90}
          height={90}
        />
      </div>
      <div className={cx('contents-wrap')}>
        <div className={cx('top-content-wrap')}>
          <p className={cx('store-name')}>센텀드림월드</p>
          <span className={cx('store-address')}>
            부산광역시 해운대구 센텀2로25, 센텀드림월드 1층(우동)
          </span>
        </div>
        <div className={cx('bottom-content-wrap')}>
          {/* <ParkIcon className={cx('parkIcon')} /> */}
          <span className={cx('distance')}>151m</span>
        </div>
      </div>
    </button>
  );
}

export default storeInfo;
