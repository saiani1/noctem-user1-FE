import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/orderStateInfo.module.scss';
import Image from 'next/image';
import { IOrderInfo } from '../../types/order';
import { nicknameState } from '../../store/atom/userStates';
import { useRecoilValue } from 'recoil';
import { orderProductDataState } from '../../store/atom/orderState';

const cx = classNames.bind(styles);

function orderStateInfo({
  setOrderProgressModal,
  orderInfoTemp,
}: {
  setOrderProgressModal: React.Dispatch<React.SetStateAction<boolean>>;
  orderInfoTemp: IOrderInfo;
}) {
  const {
    storeId,
    storeName,
    purchaseId,
    orderNumber,
    turnNumber,
    waitingTime,
    state,
  } = orderInfoTemp;
  const nickname = useRecoilValue(nicknameState);
  const orderProductData = useRecoilValue(orderProductDataState);

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
              src={orderProductData[0].imgUrl}
              alt={orderProductData[0].menuFullName}
              width={100}
              height={100}
              layout='responsive'
              className={cx('img')}
            />
          </div>
          <div className={cx('info-wrap')}>
            <div className={cx('store-info')}>{storeName}에서</div>
            <div className={cx('order-info')}>
              {state === '주문확인중' &&
                `${nickname} 님의 주문을 확인중입니다! ( ${orderNumber} )`}
              {state === '제조중' &&
                `${nickname} 님의 주문을 ${turnNumber}번째 메뉴로 준비중입니다! ( ${orderNumber} )`}
              {state === '제조완료' &&
                `${nickname} 님의 주문이 완료되었습니다! 픽업대에서 확인해주세요! ( ${orderNumber} )`}
              {state === '거절됨' && `재료 부족으로 주문이 거절되었습니다.`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default orderStateInfo;
