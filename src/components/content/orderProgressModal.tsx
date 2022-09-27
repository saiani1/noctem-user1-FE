import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/orderProgressModal.module.scss';
import OrderCancelConfirmPopUp from './orderCancelConfirmPopUp';

interface IProp {
  setIsClickOrderProgressBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function orderProgressModal(props: IProp) {
  const [isCancelActive, setIsCancelActive] = useState(true);
  const [isConfirmPopUpActive, setIsConfirmPopUpActive] = useState(false);
  const [orderProgress, setOrderProgress] = useState('주문 완료');
  const { setIsClickOrderProgressBtn } = props;
  const cx = classNames.bind(styles);

  const handleClickMenuCancel = () => {
    setIsConfirmPopUpActive(prev => {
      return !prev;
    });
  };

  return (
    <>
      {isConfirmPopUpActive && (
        <OrderCancelConfirmPopUp
          setIsConfirmPopUpActive={setIsConfirmPopUpActive}
        />
      )}
      <div className={cx('background')} />
      <div className={cx('wrap')}>
        <div className={cx('top-wrap')}>
          <div className={cx('tit-wrap')}>
            <span>센텀드림월드점(매장 내 직접 수령)에서</span>
            <h2>
              {orderProgress === '주문 완료' && '주문을 확인하고 있습니다🏃‍♀️'}
              {orderProgress === '준비 중' &&
                '(A-04)님의 주문을 4번째 메뉴로 준비 중입니다. (A-04) 🏃‍♀️'}
              {orderProgress === '준비 완료' &&
                '(A-04)님, 메뉴가 모두 준비되었어요.🤩'}
            </h2>
            <div className={cx('remain-time-wrap')}>
              <p>
                예상 대기시간 <strong>20</strong>분
              </p>
            </div>
            <p className={cx('content')}>
              주문 승인 즉시 메뉴 준비가 시작됩니다. 완성 후, 빠르게 픽업해
              주세요.
            </p>
          </div>
          <div className={cx('progress-bar-wrap')}>
            <ul className={cx('content-wrap')}>
              <li className={cx(orderProgress === '주문 완료' ? 'active' : '')}>
                주문 완료
              </li>
              <li className={cx(orderProgress === '준비 중' ? 'active' : '')}>
                준비 중
              </li>
              <li className={cx(orderProgress === '준비 완료' ? 'active' : '')}>
                준비 완료
              </li>
            </ul>
            <div className={cx('bar-wrap')}>
              <div className={cx('base-bar')} />
              <div
                className={cx(
                  'progress-bar',
                  orderProgress === '준비 중' ? 'prepare' : '',
                  orderProgress === '준비 완료' ? 'done' : '',
                )}
              />
            </div>
          </div>
        </div>
        <div className={cx('bottom-wrap')}>
          <h3>주문 내역 (1)</h3>
          <div className={cx('take-out-option')}>
            <p>포장 옵션: 포장 안함</p>
          </div>
          <div className={cx('order-info-wrap')}>
            <span className={cx('img-wrap')}>
              <Image
                src='/assets/images/jpg/menu.jpg'
                alt='menu'
                width={70}
                height={70}
              />
            </span>
            <div className={cx('order-contents-wrap')}>
              <p className={cx('order-tit')}>아이스 민트 블렌드 티</p>
              <span className={cx('order-option')}>ICED | Tall | 매장컵</span>
            </div>
          </div>
          <button
            type='button'
            disabled={!isCancelActive}
            className={cx('btn', isCancelActive ? 'active' : '')}
            onClick={handleClickMenuCancel}
          >
            주문 취소
          </button>
        </div>
      </div>
    </>
  );
}

export default orderProgressModal;
