import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

// import { ParkIcon } from '../../assets/svg/index';
import styles from '../../../styles/ui/storeInfo.module.scss';
import { IProps } from '../../types/store';

function storeInfo(props: IProps) {
  const { setOpen, data } = props;
  const {
    address,
    businessCloseHours,
    businessOpenHours,
    distance,
    index,
    isDriveThrough,
    isEcoStore,
    isOpen,
    isParking,
    mainImg,
    name,
    storeId,
  } = data;

  const cx = classNames.bind(styles);

  const handleClickStore = () => {
    setOpen(prev => {
      return !prev;
    });
  };

  return (
    <button
      type='button'
      className={cx('store-wrap')}
      onClick={handleClickStore}
    >
      <div className={cx('img-wrap')}>
        <img src={mainImg} alt={name} width={90} height={90} />
      </div>
      <div className={cx('contents-wrap')}>
        <div className={cx('top-content-wrap')}>
          <p className={cx('store-name')}>{name}</p>
          <span className={cx('store-address')}>{address}</span>
        </div>
        <div className={cx('bottom-content-wrap')}>
          {isParking && (
            <Image
              src='/assets/svg/icon-park.svg'
              alt='park'
              width={15}
              height={15}
            />
          )}
          {isEcoStore && (
            <Image
              src='/assets/svg/icon-eco.svg'
              alt='eco'
              width={15}
              height={15}
            />
          )}

          <span className={cx('distance')}>151m</span>
        </div>
      </div>
    </button>
  );
}

export default storeInfo;
