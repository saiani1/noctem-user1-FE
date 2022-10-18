import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import {
  getMyMenuDetailData,
  changeMyMenuNickName,
  deleteMyMenu,
} from '../../../pages/api/myMenu';
import styles from '../../../styles/ui/myMenuItem.module.scss';
import { IMenuData1, IMenuDetailData } from '../../../src/types/myMenu.d';
import { addComma } from './../../store/utils/function';
import MyMenuRenamePopUp from '../content/myMenuRenamePopUp';
import { addCart } from '../../../pages/api/cart';

interface IProps {
  item: IMenuData1;
  isEmpty: boolean;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteMyMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChangeMyMenuName: React.Dispatch<React.SetStateAction<boolean>>;
}

function myMenuItem({
  item,
  isEmpty,
  isFetching,
  setIsFetching,
  setIsDeleteMyMenu,
  setIsChangeMyMenuName,
}: IProps) {
  const [itemInfo, setItemInfo] = useState<IMenuDetailData>();
  const [clickRenameBtn, setClickRenameBtn] = useState(false);
  const myMenuNameRef = useRef<HTMLInputElement>(null);

  const cx = classNames.bind(styles);

  useEffect(() => {
    console.log('item:', item);
    console.log('itemInfo:', itemInfo);
    if (item !== undefined && !isEmpty) {
      console.log('item', item);
      getMyMenuDetailData(item.sizeId, item.myMenuId).then(res => {
        console.log('itemInfo', res.data.data);
        setItemInfo(res.data.data);
        setIsFetching(true);
        setIsDeleteMyMenu(prev => !prev);
        setIsChangeMyMenuName(prev => !prev);
      });
    }
  }, []);

  const handleChangeMyMenuName = () => {
    const mymenuNameValue = myMenuNameRef.current?.value;
    if (mymenuNameValue && mymenuNameValue.length !== 0) {
      changeMyMenuNickName(item?.myMenuId, mymenuNameValue).then(res => {
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
    const cartData = {
      sizeId: item.sizeId,
      quantity: 1,
      personalOptionList: item?.myPersonalOptionList,
    };

    addCart(cartData).then(res => {
      if (res.data.data) {
        toast.success('상품이 장바구니에 담겼습니다!');
      } else {
        toast.error('실패하였습니다. 잠시 후 다시 시도해주세요.');
      }
    });
  };

  const handleTest = (test: number) => {
    console.log('Test', test);
  };

  const handleDeleteMenu = (menuId: number): void => {
    console.log('Delete ItemInfo', itemInfo);
    console.log('menuId', menuId);
    deleteMyMenu(menuId).then(res => {
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
        />
      )}
      {isFetching && !isEmpty && itemInfo && (
        <li className={cx('content-wrap')}>
          <button
            type='button'
            className={cx('close-btn')}
            onClick={() => {
              handleTest(item.myMenuId);
            }}
          >
            TEST
          </button>
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
                onClick={() => {
                  handleDeleteMenu(item.myMenuId);
                }}
              >
                <img src='/assets/svg/icon-x-mark.svg' alt='삭제버튼' />
              </button>
              <div className={cx('menu-tit-wrap')}>
                <h3 className={cx('menu-tit')}>{item?.alias}</h3>
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
              <span className={cx('sub-tit')}>{itemInfo?.menuName}</span>
              <strong className={cx('price')}>
                {itemInfo?.totalMenuPrice && addComma(itemInfo?.totalMenuPrice)}
                원
              </strong>
              <span className={cx('menu-option')}>
                {itemInfo?.temperature.toUpperCase()} | {itemInfo?.size}
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
              <button type='button' className={cx('order-btn')}>
                주문하기
              </button>
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default myMenuItem;
