import React, { useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../../styles/content/cartContent.module.scss';
import CartItem from '../ui/cartItem';
import EmptyCart from './emptyCart';
import { useEffect } from 'react';
import { getCartList, getCount } from '../../../src/store/api/cart';
import {
  ICart,
  ICartTotalPriceList,
  IPriceList,
  IQtyList,
} from '../../types/cart';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cartCntState,
  loginState,
  tokenState,
} from '../../store/atom/userStates';
import {
  getSessionCartCount,
  getSessionCartList,
} from '../../store/utils/cart';
import { useRouter } from 'next/router';
import { selectedStoreState } from '../../store/atom/orderState';
import { IMenuList } from '../../types/order';
import { orderInfoState } from './../../store/atom/orderState';
import { addComma } from '../../store/utils/function';
import { IStore } from '../../types/store';
import { DownArrowBtn } from '../../../public/assets/svg';

const cx = classNames.bind(styles);

function cartContent() {
  const router = useRouter();
  const [clickTab, setClickTab] = useState('food');
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [cartCount, setCartCount] = useRecoilState(cartCntState);
  const [selectedStoreTemp, setSelectedStoreTemp] = useState<IStore>({
    index: 0,
    storeId: 0,
    name: '',
    mainImg: '',
    address: '',
    businessOpenHours: '',
    businessCloseHours: '',
    isOpen: false,
    isParking: false,
    isEcoStore: false,
    isDriveThrough: false,
    distance: '',
    contactNumber: '',
  });
  const selectedStore = useRecoilValue(selectedStoreState);
  const orderInfo = useRecoilValue(orderInfoState);

  const [total, setTotal] = useState(0);
  const [cartList, setCartList] = useState<ICart[]>();
  const [menuList, setMenuList] = useState<IMenuList[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [qtyList, setQtyList] = useState<IQtyList[]>([]);
  const [priceList, setPriceList] = useState<IPriceList[]>();

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    setClickTab((e.target as HTMLInputElement).value);
  };

  const handleClickSelectStore = () => {
    router.push(
      {
        pathname: '/selectStore',
        query: {
          isStoreSelect: false,
          backPage: '/cart',
        },
      },
      '/selectStore',
    );
  };

  const handleOrder = () => {
    if (orderInfo.purchaseId !== 0) {
      toast('?????? ?????? ????????? ????????????.', {
        icon: '????',
      });
      return;
    }

    if (selectedStoreTemp.distance === '') {
      toast.error('????????? ????????? ?????????');
      return;
    }

    if (!cartList) {
      toast.error('??????????????? ?????? ????????? ????????????.');
      return;
    }

    if (isLogin) {
      router.push(
        {
          pathname: '/order',
          query: {
            menuList: JSON.stringify(menuList),
            storeId: selectedStoreTemp.storeId,
            storeName: selectedStoreTemp.name,
            storeAddress: selectedStoreTemp.address,
            storeContactNumber: selectedStoreTemp.contactNumber,
          },
        },
        '/order',
      );
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
    setSelectedStoreTemp(selectedStore);

    if (isLogin) {
      // ?????? ??????
      getCartList(token).then(res => {
        setCartList(res.data.data);
      });
      getCount(token).then(res => {
        const resData = res.data.data === null ? 0 : res.data.data;
        setCartCount(resData);
      });
    } else {
      // ????????? ??????
      [...Array(sessionStorage.length)].map((v, i) => {
        if (sessionStorage.getItem(i + '') !== null) {
          setCartList(getSessionCartList());
        }
      });
      setCartCount(getSessionCartCount());
    }
  }, [isChange]);

  useEffect(() => {
    if (cartList && cartList.length !== 0) {
      const qtyList = cartList.map(cart => {
        return {
          cartId: cart.cartId,
          qty: cart.qty,
        };
      });
      setQtyList(qtyList);

      const totalMenuList: IMenuList[] = menuList.map(menu => {
        const sizeId = menu.sizeId;
        const qty =
          cartList.find(cart => cart.sizeId === menu.sizeId)?.qty || 1;
        const cartId =
          cartList.find(cart => cart.sizeId === menu.sizeId)?.cartId || 0;
        const menuTotalPrice =
          priceList?.find(price => price.cartId === cartId)?.amount || 0;
        // const optionList: IPersonalOptions = cartList.find(cart => cart.sizeId === menu.sizeId)?.myPersonalOptionList || [];
        return {
          sizeId: sizeId,
          cartId: cartId,
          categorySmall: menu.categorySmall,
          menuFullName: menu.menuFullName,
          menuShortName: menu.menuShortName,
          imgUrl: menu.imgUrl,
          qty: qty,
          menuTotalPrice: menuTotalPrice * qty,
          cupType: menu.cupType,
        };
      });
      setMenuList(totalMenuList);
    }
  }, [cartList]);

  useEffect(() => {
    if (
      priceList &&
      qtyList &&
      priceList.length !== 0 &&
      qtyList.length !== 0
    ) {
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

      const total = totalAmountList.reduce(
        (acc: number, curr: ICartTotalPriceList) => {
          return acc + curr.qty * curr.amount;
        },
        0,
      );

      setTotal(total);
    }
  }, [priceList, qtyList]);

  return (
    <div className={cx('wrap')}>
      <>
        <div className={cx('top-wrap')}>
          <h2>????????????</h2>
          <button
            type='button'
            className={cx('select-store-wrap')}
            onClick={handleClickSelectStore}
          >
            <span className={cx('tit')}>
              {selectedStoreTemp.distance === ''
                ? '????????? ????????? ???????????????'
                : selectedStoreTemp.name}
            </span>
            <DownArrowBtn className={cx('icon')} />
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
              ??????/??????
              <span className={cx('cnt-wrap')}>{cartCount}</span>
            </span>
          </button>
          <button
            type='button'
            className={cx('item-tab-wrap', clickTab === 'item' ? 'active' : '')}
            onClick={handleClickTab}
            value='item'
          >
            <span className={cx('tit-wrap')}>
              ??????
              <span className={cx('cnt-wrap')}>0</span>
            </span>
          </button>
        </div>
        {cartList && cartList.length !== 0 ? (
          <>
            <div className={cx('cart-wrap')}>
              <div className={cx('tit-wrap')}>
                <h3>?????? ??????</h3>
                <span>
                  ??? ?????? ?????? ?????? <strong>20</strong>???
                </span>
              </div>
            </div>
            <div className={cx('item-wrap')}>
              {cartList &&
                cartList.map(cart => (
                  <CartItem
                    key={cart.cartId}
                    cart={cart}
                    cartCount={cartCount}
                    isChange={isChange}
                    setIsChange={setIsChange}
                    handleSetCartPrice={handleSetCartPrice}
                    setMenuList={setMenuList}
                  />
                ))}
            </div>
            <div className={cx('footer')}>
              <div className={cx('price-wrap')}>
                <span className={cx('check-cnt')}>
                  ??? <strong>{cartCount}</strong>??? / 20???
                </span>
                <strong className={cx('total-price')}>
                  {addComma(total)}???
                </strong>
              </div>
              <button type='button' className={cx('btn')} onClick={handleOrder}>
                ????????????
              </button>
            </div>
          </>
        ) : (
          <EmptyCart title={clickTab === 'food' ? '??????/??????' : '??????'} />
        )}
      </>
    </div>
  );
}

export default cartContent;
