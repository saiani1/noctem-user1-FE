import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/storeInfo.module.scss';
import { IProps } from '../../types/store';
import { getStoreWaitingTime } from '../../../src/store/api/store';

function storeInfo({ setClickStoreId, setOpen, data }: IProps) {
  const {
    // index,
    storeId,
    name,
    mainImg,
    address,
    businessOpenHours,
    businessCloseHours,
    isOpen,
    isParking,
    isEcoStore,
    isDriveThrough,
    distance,
  } = data;
  const cx = classNames.bind(styles);
  const [storeWaitingTime, setStoreWaitingTime] = useState(0);

  useEffect(() => {
    if (isOpen) {
      getStoreWaitingTime(storeId).then(res => {
        setStoreWaitingTime(Math.round(res.data.data.waitingTime / 60));
      });
    }
  }, []);

  const handleClickStore = () => {
    if (isOpen) {
      setOpen(prev => {
        return !prev;
      });
      setClickStoreId(storeId);
    }
  };

  return (
    <>
      <li className={cx('store-wrap')}>
        {!isOpen && <div className={cx('close-store')}></div>}
        <button type='button' onClick={handleClickStore} disabled={!isOpen}>
          <div className={cx('img-wrap')}>
            <img src={mainImg} alt={name} />
          </div>
          <div className={cx('contents-wrap')}>
            <div className={cx('top-content-wrap')}>
              <div className={cx('store-name-wrap')}>
                <p className={cx('store-name')}>{name}</p>
                {!isOpen && (
                  <span className={cx('is-open')}>
                    <Image
                      src='/assets/svg/icon-ready.svg'
                      alt='준비'
                      width={20}
                      height={13}
                    />
                  </span>
                )}
              </div>
              <div className={cx('icon-wrap')}>
                {isParking && (
                  <span className={cx('icon')}>
                    <Image
                      src='/assets/svg/icon-park.svg'
                      alt='park'
                      width={15}
                      height={15}
                    />
                  </span>
                )}
                {isEcoStore && (
                  <span className={cx('icon')}>
                    <Image
                      src='/assets/svg/icon-eco.svg'
                      alt='eco'
                      width={15}
                      height={15}
                    />
                  </span>
                )}
                {isDriveThrough && (
                  <span className={cx('icon', 'icon-top')}>
                    <Image
                      src='/assets/svg/icon-car.svg'
                      alt='eco'
                      width={20}
                      height={20}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className={cx('store-address')}>{address}</div>
            <div className={cx('bottom-content-wrap')}>
              {isOpen && (
                <div className={cx('waiting-time-wrap')}>
                  <span>
                    예상대기시간 <strong>{storeWaitingTime}</strong>분
                  </span>
                </div>
              )}
              <span className={cx('distance')}>{distance}</span>
            </div>
          </div>
        </button>
      </li>
    </>
  );
}

export default storeInfo;
