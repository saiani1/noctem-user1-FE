import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/orderStateInfo.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

function orderStateInfo({
  setOrderProgressModal,
}: {
  setOrderProgressModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className={cx('order-state-modal-wrap')}
        onClick={() => {
          setOrderProgressModal(true);
        }}
      >
        <div className={cx('wrap')}>
          <div className={cx('img-wrap')}>
            <Image
              src='/assets/images/jpg/cup-illust.jpg'
              alt='test'
              width={100}
              height={100}
              layout='responsive'
              className={cx('img')}
            />
          </div>
          <div className={cx('info-wrap')}>
            <div className={cx('store-info')}>센텀드림월드점에서</div>
            <div className={cx('order-info')}>
              녹템님의 주문을 9번째 메뉴로 준비중입니다
            </div>
            <div className={cx('number-info')}>( A-43 )</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default orderStateInfo;
