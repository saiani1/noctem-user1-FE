/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Header from '../common/header';
import SelectStoreContent from './selectStoreContent';

import styles from '../../../styles/content/cartContent.module.scss';
import CartItem from '../ui/cartItem';
import EmptyCart from './emptyCart';
import { useEffect } from 'react';
import { getCart, getCount } from '../../../pages/api/cart';
import { getToken } from '../../store/utils/token';
import { IData, IStore } from '../../types/cart';
import { useRecoilState } from 'recoil';
import { cartCnt } from '../../store/atom/userStates';

function cartContent() {
  const cx = classNames.bind(styles);
  const [clickTab, setClickTab] = useState('food');
  const isUser = getToken() !== null && getToken() !== '{}';
  const [datas, setDatas] = useState<IData[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [count, setCount] = useRecoilState(cartCnt);
  const [selectStore, setSelectStore] = useState<IStore>();
  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(false);

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    setClickTab((e.target as HTMLInputElement).value);
  };

  const handleClickSelectStore = () => {
    setIsStoreOpen(true);
  };

  const handleOrder = () => {
    if (selectStore === undefined) {
      console.log('매장 선택 해');
      alert('매장을 선택해 주세요');
      setIsStoreOpen(true);
    }
  };

  const handleClose = () => {
    setIsStoreOpen(false);
  };

  useEffect(() => {
    if (getToken() !== null && getToken() !== '{}') {
      // 회원 조회
      console.log('회원 조회');
      getCart().then(res => {
        setDatas(res.data.data);
      });
      getCount().then(res => {
        setCount(res.data.data);
      });
    } else {
      // 비회원 조회
      console.log('비회원 조회');
      [...Array(sessionStorage.length)].map((v, i) => {
        if (sessionStorage.getItem(i + '') !== null) {
          console.log(JSON.parse(sessionStorage.getItem(i + '') || ''));
        }
      });
    }
  }, [isChange]);

  return (
    <div className={cx('wrap')}>
      {isStoreOpen ? (
        <>
          <div className={cx('store-header')}>
            <button
              type='button'
              onClick={handleClose}
              className={cx('header-back-arrow')}
            >
              <Image
                width={19}
                height={19}
                alt='back button icon'
                src='/assets/svg/icon-close.svg'
              />
            </button>
            <Header isClose={false} isBack={false} />
          </div>
          <SelectStoreContent />
        </>
      ) : (
        <>
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
              className={cx(
                'food-tab-wrap',
                clickTab === 'food' ? 'active' : '',
              )}
              onClick={handleClickTab}
              value='food'
            >
              <span className={cx('tit-wrap')}>
                음료/푸드
                <span className={cx('cnt-wrap')}>{datas && datas.length}</span>
              </span>
            </button>
            <button
              type='button'
              className={cx(
                'item-tab-wrap',
                clickTab === 'item' ? 'active' : '',
              )}
              onClick={handleClickTab}
              value='item'
            >
              <span className={cx('tit-wrap')}>
                상품
                <span className={cx('cnt-wrap')}>0</span>
              </span>
            </button>
          </div>
          {isUser && datas.length !== 0 ? (
            <>
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
              <div className={cx('item-wrap')}>
                {datas &&
                  datas.map(data => (
                    <CartItem
                      key={data.index}
                      data={data}
                      count={count}
                      isChange={isChange}
                      setIsChange={setIsChange}
                    />
                  ))}
              </div>
            </>
          ) : (
            <EmptyCart title={clickTab === 'food' ? '음료/푸드' : '상품'} />
          )}
          <div className={cx('footer')}>
            <div className={cx('price-wrap')}>
              <span className={cx('check-cnt')}>
                총 <strong>{count}</strong>개 / 20개
              </span>
              <strong className={cx('total-price')}>
                {datas &&
                  datas.reduce(function (accu: number, curr: IData) {
                    return accu + curr.qty * curr.totalMenuPrice;
                  }, 0)}
                원
              </strong>
            </div>
            <button type='button' className={cx('btn')} onClick={handleOrder}>
              주문하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default cartContent;
