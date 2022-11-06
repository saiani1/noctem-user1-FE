import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import CustomAlert from '../../components/customAlert';

import styles from '../../../styles/ui/cartItem.module.scss';
import { ICart, IData } from '../../types/cart';
import {
  changeItemCount,
  deleteItem,
  getCartMenuData,
} from '../../../src/store/api/cart';
import { addComma } from '../../store/utils/function';
import { getMenuDetail } from '../../store/api/order';
import { getSoldOutMenu } from '../../store/api/store';
import { IMenuList } from './../../types/order.d';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../store/atom/userStates';
import { loginState } from './../../store/atom/userStates';
import {
  CautionBtn,
  CloseBtn,
  MinusBtn,
  PlusBtn,
} from '../../../public/assets/svg';
import { selectedStoreState } from '../../store/atom/orderState';
import toast from 'react-hot-toast';

const cx = classNames.bind(styles);

function cartItem({
  cart,
  cartCount,
  isChange,
  setIsChange,
  handleSetCartPrice,
  setMenuList,
  isSoldOutCartItem,
  setIsSoldOutCartItem,
}: {
  cart: ICart;
  cartCount: number;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetCartPrice: (cartId: number, totalMenuPrice: number) => void;
  setMenuList: React.Dispatch<React.SetStateAction<IMenuList[]>>;
  isSoldOutCartItem: boolean;
  setIsSoldOutCartItem: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { index, cartId, sizeId, qty } = cart;
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [data, setData] = useState<IData>();
  const [isSoldOut, setIsSoldOut] = useState(false);

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
        toast.success('장바구니 아이템이 삭제되었습니다.');
        setIsChange(!isChange);
      });
    });
  };

  useEffect(() => {
    if (isLogin) {
      setIsSoldOut(false);
      getCartMenuData(sizeId, cartId).then(res => {
        const resData = res.data.data;
        const menuId = resData.menuId;
        setData(resData);
        if (selectedStore.name !== '') {
          getSoldOutMenu(selectedStore.storeId).then(res2 => {
            const soldOut = res2.data.data.find(
              (menu: any) => menu.soldOutMenuId === menuId,
            );
            if (soldOut !== undefined) {
              setIsSoldOut(true);
              setIsSoldOutCartItem(true);
              console.log('나는 품절이라네');
            } else {
              setIsSoldOut(false);
            }
          });
        }
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
        console.log('res', resData);
        setData(resData);
        setIsChange(!isChange);
      });
    }
  }, [cartCount]);

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
            </button>
          </div>
          <div className={cx('second-wrap')}>
            <span className={cx('img-wrap')}>
              {isSoldOut && <span className={cx('sold-out-menu')} />}
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
              {isSoldOut && (
                <div className={cx('sold-out-wrap')}>
                  <CautionBtn className={cx('icon')} />
                  <span>미판매</span>
                </div>
              )}
              <div className={cx('num-change-wrap')}>
                {isSoldOut && <div className={cx('sold-out-menu')} />}
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
