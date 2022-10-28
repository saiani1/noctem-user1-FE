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
import { addComma, getSessionCartCount } from './../../store/utils/function';
import MyMenuRenamePopUp from '../content/myMenuRenamePopUp';
// import { isExistToken } from '../../../store/utils/token';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartCntState, tokenState } from '../../store/atom/userStates';
import { ICartData } from '../../types/productDetail';

import { addCart } from '../../../src/store/api/cart';

import { getMyMenuData, deleteMyMenu } from '../../../src/store/api/myMenu';
import {
  orderInfoState,
  selectedStoreState,
} from '../../store/atom/orderState';
import { confirmAlert } from 'react-confirm-alert';
import CustomAlert from '../customAlert';
import { useRouter } from 'next/router';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { loginState } from './../../store/atom/userStates';

interface IProps {
  item: IMenuData1;
  isEmpty: boolean;
  isFetching: boolean;
  // handleDeleteMenu: (e: React.MouseEvent<HTMLElement>) => void;
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
    console.log('isLogin:', isLogin);
    console.log('itemInfo:', itemInfo);
    getMyMenuDetailData(item.sizeId, item.myMenuId, token).then(res => {
      setItemInfo(res.data.data);
      console.log('item', item);
    });
    console.log('info', info);
  }, [info]);

  const handleChangeMyMenuName = () => {
    const mymenuNameValue = myMenuNameRef.current?.value;
    if (mymenuNameValue && mymenuNameValue.length !== 0) {
      changeMyMenuNickName(item?.myMenuId, mymenuNameValue, token).then(res => {
        console.log(res);
        setClickRenameBtn(prev => {
          return !prev;
        });
        setIsChangeMyMenuName(prev => !prev);
        toast.success('나만의 메뉴 이름이 변경되었습니다.');
      });
    }
  };

  const handleClickRename = () => {
    setClickRenameBtn(prev => {
      return !prev;
    });
  };

  const handleClose = () => {
    console.log('click');
    setClickRenameBtn(prev => {
      return !prev;
    });
  };

  const handleAddCart = () => {
    console.log('담기');
    const sum = cartCount + 1;
    if (sum > 20) {
      toast.error('총 20개까지 담을 수 있습니다.');
      return;
    }
    // 사이즈, 개수, 컵 종류, 온도

    const cartData: ICartData = {
      sizeId: item.sizeId,
      quantity: 1,
      cupType: item.cupType,
      personalOptionList: [],
    };
    console.log('cartData : ', cartData);
    console.log('cartdata출력');
    if (!isLogin) {
      // 사진, 이름, 영문, 온도, 컵 사이즈, 컵 종류, 양, 가격
      sessionStorage.setItem(
        sessionStorage.length + '',
        JSON.stringify(cartData),
      );
      setCartCount(getSessionCartCount());
      toast.success('장바구니에 담겼습니다!');
    } else {
      addCart(cartData, token).then(res => {
        if (res.data.data) {
          console.log('mycartItem res', res);
          toast.success('장바구니에 담겼습니다!');
        } else {
          toast.error(
            '장바구니에 담을 수 없습니다. 잠시 후 다시 시도해주세요.',
          );
        }
      });
    }
  };

  const handleOrder = () => {
    if (orderInfo.storeId !== 0) {
      toast('진행 중인 주문이 있습니다.', {
        icon: '📢',
      });
      return;
    }

    if (selectedStore.distance === '') {
      confirmAlert({
        customUI: ({ onClose }) => (
          <>
            <CustomAlert
              title='주문할 매장을 선택해주세요.'
              desc='매장을 선택하신 후 주문해주세요! 품절된 상품은 주문하실 수 없습니다.'
              btnTitle='매장 선택하기'
              // id={}
              onAction={onSelectStore}
              onClose={onClose}
            />
          </>
        ),
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
    // const cartData = {
    //   sizeId: item.sizeId,
    //   quantity: 1,
    //   personalOptionList: item?.myPersonalOptionList,
    // };

    // addCart(cartData, token).then(res => {
    //   if (res.data.data) {
    //     toast.success('상품이 장바구니에 담겼습니다!');
    //   } else {
    //     toast.error('실패하였습니다. 잠시 후 다시 시도해주세요.');
    //   }
    // });
  };

  const handleTest = (test: number) => {
    console.log('Test', test);
  };

  const handleDeleteMenu = (): void => {
    console.log('Delete ItemInfo', itemInfo);
    deleteMyMenu(item.myMenuId, token).then(res => {
      console.log(res);
      setIsDeleteMyMenu(prev => !prev);
      toast.success('나만의 메뉴가 삭제되었습니다.');
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
                  <img src='/assets/svg/icon-x-mark.svg' alt='삭제버튼' />
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
                  원
                </strong>
                <span className={cx('menu-option')}>
                  {itemInfo.temperature} | {itemInfo.size} | {item.cupType}
                </span>
              </div>
              <div className={cx('btn-wrap')}>
                <button
                  type='button'
                  className={cx('cart-btn')}
                  onClick={handleAddCart}
                >
                  담기
                </button>
                <button
                  type='button'
                  className={cx('order-btn')}
                  onClick={handleOrder}
                >
                  주문하기
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
