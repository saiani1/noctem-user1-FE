import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/storeInfo.module.scss';
import { IStore } from '../../../src/types/store.d';

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClickStoreId: React.Dispatch<React.SetStateAction<number>>;
  item: IStore;
}

function storeInfo({ setClickStoreId, setOpen, item }: IProps) {
  const { name, mainImg, address, distance, isOpen, storeId, isParking } = item;
  const cx = classNames.bind(styles);

  const handleClickStore = () => {
    setOpen(prev => {
      return !prev;
    });
    setClickStoreId(storeId);
  };

  return (
    <li className={cx('store-wrap')}>
      <button type='button' onClick={handleClickStore}>
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
                    width={18}
                    height={11}
                  />
                </span>
              )}
            </div>
            <span className={cx('store-address')}>{address}</span>
          </div>
          <div className={cx('bottom-content-wrap')}>
            {isParking ? (
              <Image
                src='/assets/svg/icon-park.svg'
                alt='park'
                width={15}
                height={15}
              />
            ) : (
              <span />
            )}
            <span className={cx('distance')}>{distance}</span>
          </div>
        </div>
      </button>
    </li>
  );
}

export default storeInfo;
