import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/orderContent.module.scss';
import 'react-spring-bottom-sheet/dist/style.css';

import ChoicePaymentModal from '../../components/content/choicePaymentModal';
import RegisterCashReceiptModal from '../../components/content/registerCashReceiptModal';
import OrderPayingCompletionModal from '../../components/content/orderPayingCompletionModal';

const cx = classNames.bind(styles);

interface IProps {
  isClickPaymentBtn: boolean;
  isClickCashReceiptBtn: boolean;
  isClickSubmitBtn: boolean;
  setIsClickPaymentBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickCashReceiptBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickSubmitBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function orderContent(props: IProps) {
  const {
    isClickPaymentBtn,
    isClickCashReceiptBtn,
    isClickSubmitBtn,
    setIsClickPaymentBtn,
    setIsClickCashReceiptBtn,
    setIsClickSubmitBtn,
  } = props;

  function onDismiss() {
    setIsClickPaymentBtn(false);
    setIsClickCashReceiptBtn(false);
    setIsClickSubmitBtn(false);
  }

  const handleClickPaymentBtn = () => {
    setIsClickPaymentBtn(prev => {
      return !prev;
    });
  };

  const handleClickCashReceiptBtn = () => {
    setIsClickCashReceiptBtn(prev => {
      return !prev;
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsClickSubmitBtn(prev => {
      return !prev;
    });
  };

  return (
    <>
      <div className={cx('wrap')}>
        <form onSubmit={handleSubmit}>
          <h2 className={cx('tit')}>결제하기</h2>
          <ul className={cx('list-wrap')}>
            <li className={cx('pay-method-wrap')}>
              <h3>결제 수단</h3>
              <button
                type='button'
                className={cx('payment-wrap')}
                onClick={handleClickPaymentBtn}
              >
                <div className={cx('left')}>
                  <Image
                    src='/assets/svg/icon-card.svg'
                    alt='card'
                    width={30}
                    height={20}
                    className={cx('img')}
                  />
                  <div className={cx('txt-wrap')}>
                    <p>신용카드</p>
                  </div>
                </div>
                <Image
                  src='/assets/svg/icon-right-arrow.svg'
                  alt='right arrow'
                  width={15}
                  height={15}
                />
              </button>
            </li>
            <div className={cx('line')} />
            <li className={cx('cash-receipt-wrap')}>
              <h3>현금영수증</h3>
              <button
                type='button'
                className={cx('cash-receipt-btn')}
                onClick={handleClickCashReceiptBtn}
              >
                <span>010-1234-5678</span>
                <Image
                  src='/assets/svg/icon-right-arrow.svg'
                  alt='right arrow'
                  width={15}
                  height={15}
                  className={cx('img')}
                />
              </button>
            </li>
            <li className={cx('order-info-wrap')}>
              <h3>주문 내역</h3>
              <div className={cx('order-info')}>
                <div className={cx('img-wrap')}>
                  <Image
                    src='/assets/images/jpg/menu.jpg'
                    alt='주문한음료'
                    width={40}
                    height={40}
                  />
                </div>
                <div className={cx('order-info-text-wrap')}>
                  <div className={cx('order-item-wrap')}>
                    <p>아이스 블랙 글레이즈드 라떼</p>
                    <span>6,300원</span>
                  </div>
                  <div className={cx('order-option-wrap')}>
                    <p>ICED | Tall | 개인컵</p>
                    <span>6,300원</span>
                  </div>
                </div>
              </div>
              <div className={cx('wide-bg')} />
            </li>
            <li className={cx('price-info-wrap')}>
              <dl>
                <dt>주문 금액</dt>
                <dd>6,300원</dd>
              </dl>
              <dl>
                <dt>할인 금액</dt>
                <dd>0원</dd>
              </dl>
              <dl className={cx('total-price-wrap')}>
                <dt>최종 결제 금액</dt>
                <dd>6,300원</dd>
              </dl>
            </li>
          </ul>
          <button type='submit' className={cx('btn')}>
            6,300원 결제하기
          </button>
        </form>
      </div>
      {/* <BottomSheet open={isClickCashReceiptBtn} onDismiss={onDismiss}>
        <SheetContent>
          {isClickPaymentBtn || isClickCashReceiptBtn || isClickSubmitBtn || (
            <div style={{ height: '85vh' }} />
          )}
          {isClickPaymentBtn && <ChoicePaymentModal onDismiss={onDismiss} />}
          {isClickCashReceiptBtn && (
            <RegisterCashReceiptModal onDismiss={onDismiss} />
          )}

          {isClickSubmitBtn && (
            <OrderPayingCompletionModal onDismiss={onDismiss} />
          )}
        </SheetContent>
      </BottomSheet> */}

      <ChoicePaymentModal onDismiss={onDismiss} isOpen={isClickPaymentBtn} />

      <RegisterCashReceiptModal
        onDismiss={onDismiss}
        isOpen={isClickCashReceiptBtn}
      />

      <OrderPayingCompletionModal
        onDismiss={onDismiss}
        isOpen={isClickSubmitBtn}
      />
    </>
  );
}

export default orderContent;
