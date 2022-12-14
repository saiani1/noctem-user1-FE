import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import {
  getMyMenuDetailData,
  changeMyMenuNickName,
} from '../../../src/store/api/myMenu';
import styles from '../../../styles/ui/myMenuItem.module.scss';
import { IMenuData1, IMenuDetailData } from '../../../src/types/myMenu.d';
import { addComma } from './../../store/utils/function';
import { getSessionCartCount } from '../../store/utils/cart';
import MyMenuRenamePopUp from '../content/myMenuRenamePopUp';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartCntState, tokenState } from '../../store/atom/userStates';
import { ICartData } from '../../types/productDetail';

import { addCart } from '../../../src/store/api/cart';

import { deleteMyMenu } from '../../../src/store/api/myMenu';
import {
  orderInfoState,
  selectedStoreState,
} from '../../store/atom/orderState';
import CustomAlert from '../customAlert';
import { useRouter } from 'next/router';
import { loginState } from './../../store/atom/userStates';
import { CloseBtn } from '../../../public/assets/svg';

interface IProps {
  item: IMenuData1;
  isEmpty: boolean;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteMyMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChangeMyMenuName: React.Dispatch<React.SetStateAction<boolean>>;
  info: IMenuData1[];
  setIsChangeMyMenuList: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeMyMenuList: boolean;
}

function myMenuItem({
  item,
  isEmpty,
  isFetching,
  setIsFetching,
  setIsDeleteMyMenu,
  setIsChangeMyMenuName,
  info,
  setIsChangeMyMenuList,
  isChangeMyMenuList,
}: IProps) {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [cartCount, setCartCount] = useRecoilState(cartCntState);
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [orderInfo] = useRecoilState(orderInfoState);
  const [itemInfo, setItemInfo] = useState<IMenuDetailData>();
  const [clickRenameBtn, setClickRenameBtn] = useState(false);
  const myMenuNameRef = useRef<HTMLInputElement>(null);

  const cx = classNames.bind(styles);

  useEffect(() => {
    getMyMenuDetailData(item.sizeId, item.myMenuId, token).then(res => {
      setItemInfo(res.data.data);
    });
  }, [info]);

  const handleCustomAlert = () => {
    CustomAlert({
      title: '??????????????? ???????????????!',
      desc: '??????????????? ?????????????????????????',
      btnTitle: '??????????????? ??????',
      id: 0,
      onAction: () => {
        router.push('/cart');
      },
    });
  };

  const handleChangeMyMenuName = () => {
    const mymenuNameValue = myMenuNameRef.current?.value;
    if (mymenuNameValue && mymenuNameValue.length !== 0) {
      changeMyMenuNickName(item?.myMenuId, mymenuNameValue, token).then(res => {
        setClickRenameBtn(prev => {
          return !prev;
        });
        setIsChangeMyMenuName(prev => !prev);
        toast.success('????????? ?????? ????????? ?????????????????????.');
      });
    }
  };

  const handleClickRename = () => {
    setClickRenameBtn(prev => {
      return !prev;
    });
  };

  const handleClose = () => {
    setClickRenameBtn(prev => {
      return !prev;
    });
  };

  const handleAddCart = () => {
    const sum = cartCount + 1;
    if (sum > 20) {
      toast.error('??? 20????????? ?????? ??? ????????????.');
      return;
    }
    // ?????????, ??????, ??? ??????, ??????

    const cartData: ICartData = {
      sizeId: item.sizeId,
      quantity: 1,
      cupType: item.cupType,
      personalOptionList: [],
    };
    if (!isLogin) {
      // ??????, ??????, ??????, ??????, ??? ?????????, ??? ??????, ???, ??????
      sessionStorage.setItem(
        sessionStorage.length + '',
        JSON.stringify(cartData),
      );
      setCartCount(getSessionCartCount());
      handleCustomAlert();
    } else {
      addCart(cartData, token).then(res => {
        if (res.data.data) {
          handleCustomAlert();
        } else {
          toast.error(
            '??????????????? ?????? ??? ????????????. ?????? ??? ?????? ??????????????????.',
          );
        }
      });
    }
  };

  const handleOrder = () => {
    if (orderInfo.storeId !== 0) {
      toast('?????? ?????? ????????? ????????????.', {
        icon: '????',
      });
      return;
    }

    if (selectedStore.distance === '') {
      CustomAlert({
        title: '????????? ????????? ??????????????????.',
        desc: '????????? ???????????? ??? ??????????????????! ????????? ????????? ???????????? ??? ????????????.',
        btnTitle: '?????? ????????????',
        id: 0,
        onAction: () => {
          onSelectStore();
        },
      });
    } else {
      router.push(
        {
          pathname: '/order',
          query: {
            sizeId: item.sizeId,
            qty: 1,
            cupType: item.cupType,
            optionList: [],
            storeId: selectedStore.storeId,
            storeName: selectedStore.name,
            storeAddress: selectedStore.address,
            storeContactNumber: selectedStore.contactNumber,
          },
        },
        '/order',
      );
    }
  };

  const onSelectStore = () => {
    router.push(
      {
        pathname: '/selectStore',
        query: {
          sizeId: item.sizeId,
          qty: 1,
          cupType: item.cupType,
          optionList: [],
        },
      },
      '/selectStore',
    );
  };

  const handleDeleteMenu = (): void => {
    deleteMyMenu(item.myMenuId, token).then(res => {
      setIsDeleteMyMenu(prev => !prev);
      toast.success('????????? ????????? ?????????????????????.');
    });
  };

  return (
    <>
      {clickRenameBtn && (
        <MyMenuRenamePopUp
          prevPage='myMenu'
          itemInfo={itemInfo}
          item={item}
          myMenuNameRef={myMenuNameRef}
          handleClose={handleClose}
          handleAddMyMenuData={handleChangeMyMenuName}
          temperatureChoice={0}
          cupChoice={item.cupType}
        />
      )}
      {isEmpty !== true && itemInfo ? (
        <>
          <li className={cx('content-wrap')}>
            <img
              src={itemInfo.menuImg}
              alt={itemInfo.menuName}
              className={cx('img-wrap')}
            />
            <div className={cx('right')}>
              <div className={cx('menu-contents-wrap')}>
                <button
                  type='button'
                  className={cx('close-btn')}
                  name={itemInfo.myMenuId}
                  onClick={handleDeleteMenu}
                >
                  <CloseBtn className={cx('icon')} />
                </button>
                <div className={cx('menu-tit-wrap')}>
                  <h3 className={cx('menu-tit')}>{item.alias}</h3>
                  <button
                    type='button'
                    className={cx('edit-nickname-btn')}
                    onClick={handleClickRename}
                  >
                    <Image
                      src='/assets/svg/icon-pencil.svg'
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
                <span className={cx('sub-tit')}>{itemInfo.menuName}</span>
                <strong className={cx('price')}>
                  {itemInfo.totalMenuPrice && addComma(itemInfo.totalMenuPrice)}
                  ???
                </strong>
                <span className={cx('menu-option')}>
                  {itemInfo.temperature.toUpperCase()} | {itemInfo.size} |{' '}
                  {item.cupType}
                </span>
              </div>
              <div className={cx('btn-wrap')}>
                <button
                  type='button'
                  className={cx('cart-btn')}
                  onClick={handleAddCart}
                >
                  ??????
                </button>
                <button
                  type='button'
                  className={cx('order-btn')}
                  onClick={handleOrder}
                >
                  ????????????
                </button>
              </div>
            </div>
          </li>
        </>
      ) : undefined}
    </>
  );
}

export default myMenuItem;
