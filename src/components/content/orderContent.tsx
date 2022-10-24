import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/orderContent.module.scss';
import 'react-spring-bottom-sheet/dist/style.css';

import ChoicePaymentModal from '../../components/content/choicePaymentModal';
import RegisterCashReceiptModal from '../../components/content/registerCashReceiptModal';
import OrderPayingCompletionModal from '../../components/content/orderPayingCompletionModal';
import { useRouter } from 'next/router';
import OrderItem from '../ui/orderItem';
import { getMenuDetail } from '../../api/order';
import { IMenuData, IProps } from '../../types/order';
import { addComma } from '../../store/utils/function';

const cx = classNames.bind(styles);

function orderContent(props: IProps) {
  const {
    isClickPaymentBtn,
    isClickCashReceiptBtn,
    isClickSubmitBtn,
    setIsClickPaymentBtn,
    setIsClickCashReceiptBtn,
    setIsClickSubmitBtn,
  } = props;
  const router = useRouter();
  const [menuList, setMenuList] = useState<IMenuData[]>([
    {
      sizeId: 0,
      menuFullName: '',
      menuShortName: '',
      imgUrl: '',
      qty: 0,
      menuTotalPrice: 0,
      // optionList: [],
    },
  ]);
  const totalPrice = menuList.reduce((acc, curr) => {
    return acc + curr.menuTotalPrice;
  }, 0);
  const discountPrice = 0;
  const finallPrice = totalPrice - discountPrice;

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

  useEffect(() => {
    console.log('router', router);
    console.log('router.query', router.query);
    if (Object.keys(router.query).length === 0) {
      // 장바구니 주문하기
      console.log('장바구니 주문');
      // setMenuList();
    } else {
      // 메뉴에서 바로 주문하기
      console.log('메뉴 즉시 주문');
      console.log(router.query);
      const sizeId = router.query.sizeId ? +router.query.sizeId + 0 : 0;
      const qty = router.query.qty ? +router.query.qty + 0 : 0;
      if (router.query.sizeId !== undefined) {
        getMenuDetail(sizeId).then(res => {
          let resData: IMenuData = res.data.data;
          console.log('res', resData);
          setMenuList([
            {
              sizeId: sizeId,
              menuFullName: resData.menuFullName,
              menuShortName: resData.menuShortName,
              imgUrl: resData.imgUrl,
              qty: qty,
              menuTotalPrice: qty * resData.menuTotalPrice,
              // optionList: [],
            },
          ]);
        });
      }
    }
  }, []);

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
              <h3>주문 내역 ({menuList && menuList.length})</h3>
              <ul>
                {menuList &&
                  menuList.map(menu => (
                    <OrderItem key={menu.imgUrl} menu={menu} />
                  ))}
              </ul>
              <div className={cx('wide-bg')} />
            </li>
            <li className={cx('price-info-wrap')}>
              <dl>
                <dt>주문 금액</dt>
                <dd>{addComma(totalPrice)}원</dd>
              </dl>
              <dl>
                <dt>할인 금액</dt>
                <dd>{addComma(discountPrice)}원</dd>
              </dl>
              <dl className={cx('total-price-wrap')}>
                <dt>최종 결제 금액</dt>
                <dd>{addComma(finallPrice)}원</dd>
              </dl>
            </li>
          </ul>
          <button type='submit' className={cx('btn')}>
            {addComma(finallPrice)}원 결제하기
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
