import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/cartItem.module.scss';
import { ICart, IData } from '../../types/cart';
import {
  changeItemCount,
  deleteItem,
  getCartMenuData,
} from '../../../src/store/api/cart';
import { addComma } from '../../store/utils/function';
import { getMenuDetail } from '../../store/api/order';
import { IMenuList } from './../../types/order.d';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../store/atom/userStates';
import { loginState } from './../../store/atom/userStates';
import { CloseBtn, MinusBtn, PlusBtn } from '../../../public/assets/svg';

const cx = classNames.bind(styles);

function cartItem({
  cart,
  cartCount,
  isChange,
  setIsChange,
  handleSetCartPrice,
  setMenuList,
}: {
  cart: ICart;
  cartCount: number;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetCartPrice: (cartId: number, totalMenuPrice: number) => void;
  setMenuList: React.Dispatch<React.SetStateAction<IMenuList[]>>;
}) {
  const { index, cartId, sizeId, qty } = cart;
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState<IData>();

  const handleCountChange = (type: string, id: number, qty: number) => {
    let isSuccess = false;

    if (type === 'add' && cartCount < 20) {
      qty++;
      isSuccess = true;
    }
    if (type === 'sub' && qty > 1) {
      qty--;
      isSuccess = true;
    }

    if (isSuccess) {
      changeItemCount(id, qty, token).then(res => {
        if (res.data.data) {
          setIsChange(!isChange);
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteItem(id, token).then(res => {
      getCartMenuData(sizeId, cartId).then(menu => {
        const resData = menu.data.data;
        handleSetCartPrice(resData.cartId, resData.totalMenuPrice);
        setIsChange(!isChange);
      });
    });
  };

  useEffect(() => {
    if (isLogin) {
      getCartMenuData(sizeId, cartId).then(res => {
        const resData = res.data.data;
        setData(resData);
        handleSetCartPrice(resData.cartId, resData.totalMenuPrice);
      });

      getMenuDetail(sizeId, cartId).then(res => {
        const resData = res.data.data;
        setMenuList(prev => {
          return [
            ...prev,
            {
              sizeId: sizeId,
              cartId: cartId,
              categorySmall: resData.categorySmall,
              menuFullName: resData.menuFullName,
              menuShortName: resData.menuShortName,
              imgUrl: resData.imgUrl,
              qty: qty,
              menuTotalPrice: 0,
              cupType: cart.cupType,
              optionList: [],
            },
          ];
        });
        setIsChange(!isChange);
      });
    } else {
      getCartMenuData(sizeId, 0).then(res => {
        const resData = res.data.data;
        setData(resData);
        setIsChange(!isChange);
      });
    }
  }, []);

  return (
    <>
      {data && (
        <div className={cx('cart-item-wrap')}>
          <div className={cx('first-wrap')}>
            {/* <input type='checkbox' /> */}
            <button
              type='button'
              className={cx('close-btn')}
              onClick={() => {
                handleDelete(cartId);
              }}
            >
              <CloseBtn className={cx('icon')} />
              {/* <Image src='/assets/svg/icon-x-mark.svg' width={8} height={8} /> */}
            </button>
          </div>
          <div className={cx('second-wrap')}>
            <span className={cx('img-wrap')}>
              <img src={data.menuImg} width={100} height={100} />
            </span>
            <div className={cx('content-wrap')}>
              <h4 className={cx('kor-name')}>{data.menuName}</h4>
              <span className={cx('eng-name')}>{data.menuEngName}</span>
              <div className={cx('option-wrap')}>
                <span className={cx('option')}>
                  {data.temperature.toUpperCase()} | {data.size} |{' '}
                  {cart.cupType}
                </span>
                <span className={cx('price')}>
                  {addComma(data.totalMenuPrice)}원
                </span>
              </div>
              {/* <button type='button' className={cx('option-change-btn')}>
              옵션변경
            </button> */}
              <div className={cx('num-change-wrap')}>
                <div className={cx('left')}>
                  <div
                    className={cx('icon-btn')}
                    onClick={() => {
                      handleCountChange('sub', cartId, qty);
                    }}
                  >
                    <MinusBtn
                      className={cx('icon', qty === 1 ? 'disable' : '')}
                    />{' '}
                  </div>
                  <strong>{qty}</strong>
                  <div
                    className={cx('icon-btn')}
                    onClick={() => {
                      handleCountChange('add', cartId, qty);
                    }}
                  >
                    <PlusBtn className={cx('icon')} />
                  </div>
                </div>
                <span>{addComma(data.totalMenuPrice * qty)}원</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default cartItem;
