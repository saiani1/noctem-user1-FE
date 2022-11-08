import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/storeInfo.module.scss';
import { IProps } from '../../types/store';
import { getStoreWaitingTime } from '../../../src/store/api/store';
import { CarBtn, EcoBtn, ParkBtn, ReadyBtn } from '../../../public/assets/svg';

function storeInfo({ setClickStoreId, setOpen, data }: IProps) {
  const {
    // index,
    storeId,
    name,
    mainImg,
    address,
    // businessOpenHours,
    // businessCloseHours,
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
    setOpen(prev => {
      return !prev;
    });
    setClickStoreId(storeId);
  };

  return (
    <>
      <li className={cx('store-wrap')}>
        <button type='button' onClick={handleClickStore}>
          {!isOpen && <div className={cx('close-store')}></div>}
          <div className={cx('img-wrap')}>
            <img src={mainImg} alt={name} />
          </div>
          <div className={cx('contents-wrap')}>
            <div className={cx('top-content-wrap')}>
              <div className={cx('store-name-wrap')}>
                <p className={cx('store-name')}>{name}</p>
                {!isOpen && <ReadyBtn className={cx('is-open')} />}
              </div>
              <div className={cx('icon-wrap')}>
                {isParking && <ParkBtn className={cx('park-icon')} />}
                {isEcoStore && <EcoBtn className={cx('eco-icon')} />}
                {isDriveThrough && <CarBtn className={cx('car-icon')} />}
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
