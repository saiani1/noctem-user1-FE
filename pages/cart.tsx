/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Router from 'next/router';
import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from '../styles/pages/cart.module.scss';
import Header from '../src/components/common/header';
import CartItem from '../src/components/ui/cartItem';
// import EmptyCart from '../src/components/content/emptyCart';

function cart() {
  const cx = classNames.bind(styles);
  const [clickTab, setClickTab] = useState('food');

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    setClickTab((e.target as HTMLInputElement).value);
  };

  const handleClickSelectStore = () => {
    Router.push('/selectStore');
  };

  return (
    <div className={cx('wrap')}>
      <Header />
      <div className={cx('top-wrap')}>
        <h2>장바구니</h2>
        <button
          type='button'
          className={cx('select-store-wrap')}
          onClick={handleClickSelectStore}
        >
          <span className={cx('tit')}>주문할 매장을 선택해 주세요.</span>
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
            <span className={cx('cnt-wrap')}>0</span>
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
      {/* <EmptyCart title={clickTab === 'food' ? '음료/푸드' : '상품'} /> */}
      <div className={cx('cart-wrap')}>
        <div className={cx('tit-wrap')}>
          <h3>주문 메뉴</h3>
          <span>
            총 주문 가능 수량 <strong>20</strong>개
          </span>
        </div>
        <div className={cx('check-option-wrap')}>
          <div className={cx('all-check-wrap')}>
            <input type='checkbox' id='all' />
            <label htmlFor='all'>전체 선택</label>
          </div>
          <div className={cx('delete-btn-wrap')}>
            <button type='button'>선택삭제</button>
            <button type='button'>전체삭제</button>
          </div>
        </div>
      </div>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <div className={cx('footer')}>
        <div className={cx('price-wrap')}>
          <span className={cx('check-cnt')}>
            총 <strong>0</strong>개 / 20개
          </span>
          <strong className={cx('total-price')}>0원</strong>
        </div>
        <button type='button' className={cx('btn')}>
          주문하기
        </button>
      </div>
    </div>
  );
}

export default cart;
