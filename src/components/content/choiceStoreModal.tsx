import React, { useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/choiceStoreModal.module.scss';
import { IStore } from '../../../src/types/store.d';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

interface IProps {
  clickStoreInfo: IStore;
  handleSelect: () => void;
  handleOrder: () => void;
}

function choiceStoreModal({
  clickStoreInfo,
  handleSelect,
  handleOrder,
}: IProps) {
  const {
    name,
    mainImg,
    address,
    businessOpenHours,
    businessCloseHours,
    isOpen,
    isParking,
    isEcoStore,
    isDriveThrough,
    contactNumber,
  } = clickStoreInfo;
  const router = useRouter();

  return (
    <>
      <div className={cx('wrap')}>
        <div className={cx('img-wrap')}>
          <img src={mainImg} alt={name} className={cx('img')} />
        </div>
        <div className={cx('tit-wrap')}>
          <h2>{name}</h2>
          <div className={cx('tit-address-wrap')}>
            <p>{address}</p>
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
              <strong>카페</strong>
              {businessOpenHours} - {businessCloseHours}
            </span>
          </div>
        </div>
        <button
          onClick={router.query.isStoreSelect ? handleSelect : handleOrder}
        >
          매장 내 직접 수령
        </button>
      </div>
    </>
  );
}

export default choiceStoreModal;
