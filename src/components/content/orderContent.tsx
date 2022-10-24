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
import { addOrder, getMenuDetail } from '../../../pages/api/order';
import { IMenuList, IProps, IPurchaseData } from '../../types/order';
import { addComma } from '../../store/utils/function';
import toast from 'react-hot-toast';
import { IUserDetailInfo } from '../../types/user';
import { isExistToken } from '../../store/utils/token';
import { getUserDetailInfo } from '../../../pages/api/user';
import {
  orderInfoState,
  selectedStoreState,
} from '../../store/atom/orderState';
import { useRecoilState } from 'recoil';
import { deleteAll } from '../../../pages/api/cart';

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
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [orderInfo] = useRecoilState(orderInfoState);
  const [, setOrderInfo] = useRecoilState(orderInfoState);
  const [menuList, setMenuList] = useState<IMenuList[]>();
  const [userDetailInfo, setUserDetailInfo] = useState<IUserDetailInfo>({
    userAge: 0,
    userSex: '남자',
  });
  const totalPrice =
    (menuList &&
      menuList.reduce((acc, curr) => {
        return acc + curr.menuTotalPrice;
      }, 0)) ||
    0;
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

  const handleOnSubmitModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsClickSubmitBtn(prev => {
      return !prev;
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('주문 ㄱㄱ');
    if (orderInfo.storeId !== 0) {
      toast('진행 중인 주문이 있습니다.', {
        icon: '📢',
      });
      return;
    }

    // 유효성 검사 추가 : 매장 있을 때, 메뉴 리스트 있을 때, 카드 있을 때, 현금영수증 있을 때
    if (menuList) {
      const orderData: IPurchaseData = {
        storeId: selectedStore.storeId,
        storeName: selectedStore.name,
        storeAddress: selectedStore.address,
        storeContactNumber: selectedStore.contactNumber,
        userAge: userDetailInfo.userAge,
        userSex: userDetailInfo.userSex,
        purchaseTotalPrice: totalPrice,
        cardCorp: '신한카드',
        cardPaymentPrice: totalPrice,
        menuList: menuList,
      };
      console.log('orderData', orderData);
      addOrder(orderData).then(res => {
        console.log('res', res);
        toast.success('주문이 완료되었습니다!'); // 대기 시간, 번호
        setOrderInfo(res.data.data);
        deleteAll().then(res => {
          console.log('전체 삭제', res);
        });
        router.push('/');
      });
    }
  };

  useEffect(() => {
    const query = router.query;
    console.log('router', router);
    console.log('query', query);

    if (Object.keys(router.query).length === 0) {
      console.log('잘못된 접근');
      toast.error('잘못된 접근입니다. 이전 페이지로 돌아갑니다.');
      router.back();
      return;
    }

    if (isExistToken()) {
      // 회원 주문
      getUserDetailInfo().then(res => {
        setUserDetailInfo(res.data.data);
      });
    } else {
      // 비회원 주문
      // 정보 입력 받아야 함
      // setUserDetailInfo(res.data.data);
    }

    if (query.menuList) {
      console.log('장바구니 주문');
      const menuList = JSON.parse(query.menuList + '');
      setMenuList(menuList);
    } else {
      console.log('메뉴 즉시 주문');
      const sizeId = query.sizeId ? +query.sizeId + 0 : 0;
      const qty = query.qty ? +query.qty + 0 : 0;
      const cartId = query.cartId ? +query.cartId + 0 : 0;
      console.log('sizeId', sizeId, ', cartId', cartId, ', qty', qty);
      getMenuDetail(sizeId, 0).then(res => {
        let resData: IMenuList = res.data.data;
        console.log('orderContent resData', resData);
        setMenuList([
          {
            sizeId: sizeId,
            menuFullName: resData.menuFullName,
            menuShortName: resData.menuShortName,
            imgUrl: resData.imgUrl,
            qty: qty,
            menuTotalPrice: qty * resData.menuTotalPrice,
            cartId: cartId,
            // optionList: [],
          },
        ]);
      });
    }
  }, []);

  return (
    <>
      <div className={cx('wrap')}>
        <form onSubmit={handleOnSubmitModal}>
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
                    <OrderItem key={menu.sizeId} menu={menu} />
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

      <ChoicePaymentModal onDismiss={onDismiss} isOpen={isClickPaymentBtn} />

      <RegisterCashReceiptModal
        onDismiss={onDismiss}
        isOpen={isClickCashReceiptBtn}
      />

      <OrderPayingCompletionModal
        onDismiss={onDismiss}
        isOpen={isClickSubmitBtn}
        selectedStore={selectedStore}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default orderContent;
