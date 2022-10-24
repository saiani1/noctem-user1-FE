import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from '../../../styles/ui/cartItem.module.scss';
import { ICart, IData } from '../../types/cart';
import {
  changeItemCount,
  deleteItem,
  getCartMenuData,
} from '../../../pages/api/cart';
import { addComma } from '../../store/utils/function';
import { isExistToken } from './../../store/utils/token';
import { getMenuDetail } from '../../../pages/api/order';
import { IMenuList } from './../../types/order.d';

const cx = classNames.bind(styles);

function cartItem({
  cart,
  count,
  isChange,
  setIsChange,
  handleSetCartPrice,
  setMenuList,
}: {
  cart: ICart;
  count: number;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetCartPrice: (cartId: number, totalMenuPrice: number) => void;
  setMenuList: React.Dispatch<React.SetStateAction<IMenuList[]>>;
}) {
  const { index, cartId, sizeId, qty } = cart;
  const [data, setData] = useState<IData>();

  const handleCountChange = (type: string, id: number, qty: number) => {
    let isSuccess = false;

    if (type === 'add' && count < 20) {
      qty++;
      isSuccess = true;
    }
    if (type === 'sub' && qty > 1) {
      qty--;
      isSuccess = true;
    }

    if (isSuccess) {
      changeItemCount(id, qty).then(res => {
        if (res.data.data) {
          setIsChange(!isChange);
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteItem(id).then(res => {
      getCartMenuData(sizeId, cartId).then(menu => {
        const resData = menu.data.data;
        handleSetCartPrice(resData.cartId, resData.totalMenuPrice);
        setIsChange(!isChange);
      });
    });
  };

  useEffect(() => {
    if (isExistToken()) {
      getCartMenuData(sizeId, cartId).then(res => {
        const resData = res.data.data;
        setData(resData);
        console.log('cartMenu', resData);
        handleSetCartPrice(resData.cartId, resData.totalMenuPrice);
        // setIsChange(!isChange);
      });

      getMenuDetail(sizeId, cartId).then(res => {
        const resData = res.data.data;
        setMenuList(prev => {
          return [
            ...prev,
            {
              sizeId: sizeId,
              cartId: cartId,
              menuFullName: resData.menuFullName,
              menuShortName: resData.menuShortName,
              imgUrl: resData.imgUrl,
              qty: qty,
              menuTotalPrice: 0,
              optionList: [],
            },
          ];
        });
        setIsChange(!isChange);
      });
    } else {
      getCartMenuData(sizeId, 0).then(res => {
        const resData = res.data.data;
        console.log('res', resData);
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
              <Image src='/assets/svg/icon-x-mark.svg' width={8} height={8} />
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
                <span
                  className={cx('option')}
                >{`${data.temperature} | ${data.size} | 매장 컵`}</span>
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
                    <Image
                      src={
                        qty > 1
                          ? '/assets/svg/icon-minus-active.svg'
                          : '/assets/svg/icon-minus.svg'
                      }
                      alt='minus icon'
                      width={20}
                      height={20}
                    />
                  </div>
                  <strong>{qty}</strong>
                  <div
                    className={cx('icon-btn')}
                    onClick={() => {
                      handleCountChange('add', cartId, qty);
                    }}
                  >
                    <Image
                      src='/assets/svg/icon-plus-active.svg'
                      alt='plus icon'
                      width={20}
                      height={20}
                    />
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
