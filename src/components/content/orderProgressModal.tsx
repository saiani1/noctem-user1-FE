import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/orderProgressModal.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import {
  orderInfoState,
  orderProductDataState,
} from '../../store/atom/orderState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { IOrderInfo } from '../../types/order';
import { nicknameState } from '../../store/atom/userStates';
import OrderMenuItem from './../ui/orderMenuItem';

const cx = classNames.bind(styles);

function orderProgressModal({
  onDismiss,
  isOpen,
  orderInfoTemp,
  handleClose,
}: {
  onDismiss: () => void;
  isOpen: boolean;
  orderInfoTemp: IOrderInfo;
  handleClose: () => void;
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
  const [, setOrderInfo] = useRecoilState(orderInfoState);
  const [orderProductData, setOrderProductData] = useRecoilState(
    orderProductDataState,
  );

  const handleOrderCancel = () => {
    console.log('주문 취소');
  };

  const handleOrderClear = () => {
    console.log('수령 완료');
    onDismiss();
    setOrderInfo({
      storeId: 0,
      storeName: '',
      purchaseId: 0,
      orderNumber: '',
      turnNumber: 0,
      waitingTime: 0,
      state: '',
    });
    setOrderProductData([]);
  };

  return (
    <>
      <BottomSheet open={isOpen} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <div className={cx('wrap')}>
            <div className={cx('top-wrap')}>
              <div className={cx('tit-wrap')}>
                <span className={cx('store')}>{storeName}에서</span>
                {state === '주문확인중' && (
                  <>
                    <h2 className={cx('order-status')}>
                      주문을 확인하고 있습니다 🏃‍♀️
                    </h2>
                    <div className={cx('remain-time-wrap')}>
                      <p>
                        예상 대기시간{' '}
                        <strong>{Math.ceil(waitingTime / 60)}</strong>분
                      </p>
                    </div>
                    <p className={cx('content')}>
                      주문 확인 전까지 취소가 가능합니다. 주문이 확인되면 메뉴
                      준비가 시작됩니다.
                    </p>
                  </>
                )}
                {state === '제조중' && (
                  <>
                    <h2 className={cx('order-status')}>
                      {nickname} 님의 주문을 {turnNumber}번째 메뉴로 준비
                      중입니다. (A-04) 🏃‍♀️
                    </h2>
                    <div className={cx('remain-time-wrap')}>
                      <p>
                        남은 대기시간{' '}
                        <strong>{Math.ceil(waitingTime / 60)}</strong>분
                      </p>
                    </div>
                    <p className={cx('content')}>
                      주문이 확인되어 취소가 불가능합니다. 메뉴 준비가
                      시작되었습니다. 완성 후, 빠르게 픽업해 주세요.
                    </p>
                  </>
                )}
                {state === '제조완료' && (
                  <>
                    <h2 className={cx('order-status')}>
                      {nickname} 님, 메뉴가 모두 준비되었어요. 🤩
                    </h2>
                    <p className={cx('content')}>
                      픽업대에서 메뉴를 확인해주세요!
                    </p>
                  </>
                )}
                {state === '거절됨' && (
                  <>
                    <h2 className={cx('order-status')}>
                      {nickname} 님, 재료가 부족하여 주문이 거절되었습니다. 😥
                    </h2>
                    <p className={cx('content')}>조속히 준비하겠습니다.</p>
                  </>
                )}
              </div>
              <div className={cx('progress-bar-wrap')}>
                <ul className={cx('content-wrap')}>
                  <li className={cx(state === '주문확인중' ? 'active' : '')}>
                    주문 확인 중
                  </li>
                  <li className={cx(state === '제조중' ? 'active' : '')}>
                    준비 중
                  </li>
                  <li className={cx(state === '제조완료' ? 'active' : '')}>
                    준비 완료
                  </li>
                </ul>
                <div className={cx('bar-wrap')}>
                  <div className={cx('base-bar')} />
                  <div
                    className={cx(
                      'progress-bar',
                      state === '제조중' ? 'prepare' : '',
                      state === '제조완료' ? 'done' : '',
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={cx('bottom-wrap')}>
              <h3>주문 내역 ({orderProductData && orderProductData.length})</h3>
              <div>
                <ul className={cx('menu-list-wrap')}>
                  {orderProductData &&
                    orderProductData.map(data => <OrderMenuItem data={data} />)}
                </ul>
              </div>
              <div className={cx('btn-wrap')}>
                {state === '주문확인중' && (
                  <>
                    <button
                      type='button'
                      className={cx('btn', 'btn-cancel')}
                      onClick={handleOrderCancel}
                    >
                      주문 취소
                    </button>
                    <button
                      type='button'
                      className={cx('btn', 'btn-confirm')}
                      onClick={() => {
                        onDismiss();
                      }}
                    >
                      확인
                    </button>
                  </>
                )}
                {state === '제조중' && (
                  <button
                    type='button'
                    className={cx('btn', 'btn-confirm')}
                    onClick={() => {
                      onDismiss();
                    }}
                  >
                    확인
                  </button>
                )}
                {state === '제조완료' && (
                  <>
                    <button
                      type='button'
                      className={cx('btn', 'btn-confirm', 'm-r-10')}
                      onClick={handleOrderClear}
                    >
                      수령 완료
                    </button>
                    <button
                      type='button'
                      className={cx('btn', 'btn-success')}
                      onClick={() => {
                        onDismiss();
                      }}
                    >
                      확인
                    </button>
                  </>
                )}
                {state === '거절됨' && (
                  <button
                    type='button'
                    className={cx('btn', 'btn-confirm')}
                    onClick={() => {
                      handleClose();
                      onDismiss();
                    }}
                  >
                    확인
                  </button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
    </>
  );
}

export default orderProgressModal;
