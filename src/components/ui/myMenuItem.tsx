import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import {
  getMyMenuDetailData,
  changeMyMenuNickName,
} from '../../../pages/api/myMenu';
import styles from '../../../styles/ui/myMenuItem.module.scss';
import { IMenuData1, IMenuDetailData } from '../../../src/types/myMenu.d';
import { addComma } from './../../store/utils/function';
import MyMenuRenamePopUp from '../content/myMenuRenamePopUp';

interface IProps {
  item: IMenuData1;
  isEmpty: boolean;
  isFetching: boolean;
  handleDeleteMenu: (e: React.MouseEvent<HTMLElement>) => void;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteMyMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChangeMyMenuName: React.Dispatch<React.SetStateAction<boolean>>;
}

function myMenuItem({
  item,
  isEmpty,
  isFetching,
  handleDeleteMenu,
  setIsFetching,
  setIsDeleteMyMenu,
  setIsChangeMyMenuName,
}: IProps) {
  const [itemInfo, setItemInfo] = useState<IMenuDetailData>();
  const [clickRenameBtn, setClickRenameBtn] = useState(false);
  const myMenuNameRef = useRef<HTMLInputElement>(null);

  const cx = classNames.bind(styles);

  useEffect(() => {
    if (item !== undefined && !isEmpty) {
      getMyMenuDetailData(item.sizeId, item.myMenuId).then(res => {
        const resData = res.data.data;
        const mymenuInfo = {
          ...resData,
          sizeId: item.sizeId,
        };
        setItemInfo(mymenuInfo);
        setIsFetching(true);
        setIsDeleteMyMenu(false);
        setIsChangeMyMenuName(false);
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
        setIsChangeMyMenuName(true);
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
      {isFetching && !isEmpty && (
        <li className={cx('content-wrap')}>
          <img
            src={itemInfo?.menuImg}
            alt={itemInfo?.menuName}
            className={cx('img-wrap')}
          />
          <div className={cx('right')}>
            <div className={cx('menu-contents-wrap')}>
              <button
                type='button'
                className={cx('close-btn')}
                name={itemInfo?.myMenuId}
                onClick={handleDeleteMenu}
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
                {itemInfo?.temperature} | {itemInfo?.size}
              </span>
            </div>
            <div className={cx('btn-wrap')}>
              <button type='button' className={cx('cart-btn')}>
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
