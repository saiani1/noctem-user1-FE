import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Header from '../common/header';
import SelectStoreContent from './selectStoreContent';
import toast from 'react-hot-toast';

import styles from '../../../styles/content/cartContent.module.scss';
import CartItem from '../ui/cartItem';
import EmptyCart from './emptyCart';
import { useEffect } from 'react';
import { getCartList, getCount } from '../../../pages/api/cart';
import { getToken } from '../../store/utils/token';
import {
  ICart,
  ICartTotalPriceList,
  IPriceList,
  IQtyList,
} from '../../types/cart';
import { useRecoilState } from 'recoil';
import { cartCnt } from '../../store/atom/userStates';
import {
  addComma,
  getSessionCartCount,
  getSessionCartList,
} from '../../store/utils/function';
import { useRouter } from 'next/router';
import { selectedStoreState } from '../../store/atom/orderState';

function cartContent() {
  const cx = classNames.bind(styles);
  const [clickTab, setClickTab] = useState('food');
  const [cartList, setCartList] = useState<ICart[]>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [count, setCount] = useRecoilState(cartCnt);
  const [selectedStore] = useRecoilState(selectedStoreState);

  const [total, setTotal] = useState(0);
  const [qtyList, setQtyList] = useState<IQtyList[]>([]);
  const [priceList, setPriceList] = useState<IPriceList[]>();
  const router = useRouter();

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    setClickTab((e.target as HTMLInputElement).value);
  };

  const handleClickSelectStore = () => {
    router.push({
      pathname: '/selectStore',
      query: {
        isStoreSelect: false,
        backPage: '/cart',
      },
    });
  };

  const handleOrder = () => {
    if (selectedStore.distance === '') {
      toast.error('매장을 선택해 주세요');
    } else {
      console.log('주문하기');
    }
  };

  const handleSetCartPrice = (cartId: number, totalMenuPrice: number) => {
    if (priceList) {
      const newPriceList = priceList.filter((arr, i, callback) => {
        return i !== callback.findIndex(loc => loc.cartId === cartId);
      });
      setPriceList(newPriceList);
    } else {
      setPriceList(prev => {
        return [...(prev || []), { cartId: cartId, amount: totalMenuPrice }];
      });
    }
  };

  useEffect(() => {
    console.log('isChange', isChange);
    if (getToken() !== null && getToken() !== '{}') {
      // 회원 조회
      console.log('회원 조회');
      getCartList().then(res => {
        setCartList(res.data.data);
      });
      getCount().then(res => {
        setCount(res.data.data);
      });
    } else {
      // 비회원 조회
      console.log('비회원 조회');
      [...Array(sessionStorage.length)].map((v, i) => {
        if (sessionStorage.getItem(i + '') !== null) {
          console.log(JSON.parse(sessionStorage.getItem(i + '') + ''));
          setCartList(getSessionCartList());
        }
      });
      setCount(getSessionCartCount());
    }
  }, [isChange]);

  useEffect(() => {
    console.log('cartList', cartList);
    if (cartList && cartList.length !== 0) {
      const qtyList = cartList.map(cart => {
        return {
          cartId: cart.cartId,
          qty: cart.qty,
        };
      });
      setQtyList(qtyList);
    }
  }, [cartList]);

  useEffect(() => {
    console.log('priceList', priceList);
    console.log('qtyList', qtyList);
    if (priceList && priceList.length !== 0 && qtyList.length !== 0) {
      const totalAmountList = priceList.map(price => {
        const cartId = price.cartId;
        const amount = price.amount;
        const qty = qtyList.find(qty => qty.cartId === price.cartId)?.qty || 1;
        return {
          cartId: cartId,
          amount: amount,
          qty: qty,
        };
      });

      console.log('totalAmountList', totalAmountList);
      const total = totalAmountList.reduce(
        (acc: number, curr: ICartTotalPriceList) => {
          return acc + curr.qty * curr.amount;
        },
        0,
      );

      setTotal(total);
    }
  }, [priceList, qtyList]);

  useEffect(() => {
    console.log('total', total);
  }, [total]);

  return (
    <div className={cx('wrap')}>
      <>
        <div className={cx('top-wrap')}>
          <h2>장바구니</h2>
          <button
            type='button'
            className={cx('select-store-wrap')}
            onClick={handleClickSelectStore}
          >
            <span className={cx('tit')}>
              {selectedStore.distance === ''
                ? '주문할 매장을 선택하세요'
                : selectedStore.name}
            </span>
            <Image
              src='/assets/svg/icon-down-arrow-white.svg'
              width={12}
              height={10}
            />
          </button>
        </div>
        <div className={cx('tab-wrap')}>
          <button
            type='button'
            className={cx('food-tab-wrap', clickTab === 'food' ? 'active' : '')}
            onClick={handleClickTab}
            value='food'
          >
            <span className={cx('tit-wrap')}>
              음료/푸드
              <span className={cx('cnt-wrap')}>{count}</span>
            </span>
          </button>
          <button
            type='button'
            className={cx('item-tab-wrap', clickTab === 'item' ? 'active' : '')}
            onClick={handleClickTab}
            value='item'
          >
            <span className={cx('tit-wrap')}>
              상품
              <span className={cx('cnt-wrap')}>0</span>
            </span>
          </button>
        </div>
        {cartList && cartList.length !== 0 ? (
          <>
            <div className={cx('cart-wrap')}>
              <div className={cx('tit-wrap')}>
                <h3>주문 메뉴</h3>
                <span>
                  총 주문 가능 수량 <strong>20</strong>개
                </span>
              </div>
              {/* <div className={cx('check-option-wrap')}>
                  <div className={cx('all-check-wrap')}>
                    <input type='checkbox' id='all' />
                    <label htmlFor='all'>전체 선택</label>
                  </div>
                  <div className={cx('delete-btn-wrap')}>
                    <button type='button'>선택삭제</button>
                    <button type='button'>전체삭제</button>
                  </div>
                </div> */}
            </div>
            <div className={cx('item-wrap')}>
              {cartList &&
                cartList.map(cart => (
                  <CartItem
                    key={cart.cartId}
                    cart={cart}
                    count={count}
                    isChange={isChange}
                    setIsChange={setIsChange}
                    handleSetCartPrice={handleSetCartPrice}
                  />
                ))}
            </div>
            <div className={cx('footer')}>
              <div className={cx('price-wrap')}>
                <span className={cx('check-cnt')}>
                  총 <strong>{count}</strong>개 / 20개
                </span>
                <strong className={cx('total-price')}>
                  {addComma(total)}원
                </strong>
              </div>
              <button type='button' className={cx('btn')} onClick={handleOrder}>
                주문하기
              </button>
            </div>
          </>
        ) : (
          <EmptyCart title={clickTab === 'food' ? '음료/푸드' : '상품'} />
        )}
      </>
    </div>
  );
}

export default cartContent;
