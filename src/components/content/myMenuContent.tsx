import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../../styles/content/myMenuContent.module.scss';
import {
  getMyMenuData,
  deleteMyMenu,
  getShowMainMyMenu,
  changeShowMainMyMenu,
} from '../../../src/store/api/myMenu';
import { IMenuData1 } from '../../../src/types/myMenu.d';
import ToggleCheckbox from '../ui/toggleCheckbox';
import EmptyMyMenu from '../content/emptyMyMenu';
import MyMenuItem from '../ui/myMenuItem';
import ChangeOrderMyMenuModal from './changeOrderMyMenuModal';

function myMenuContent() {
  const [isClickChangeOrderBtn, setIsClickChangeOrderBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [info, setInfo] = useState<IMenuData1[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleteMyMenu, setIsDeleteMyMenu] = useState(false);
  const [isChangeMyMenuName, setIsChangeMyMenuName] = useState(false);
  const [showMyMenu, setShowMyMenu] = useState(false);
  const [isChangeMyMenuList, setIsChangeMyMenuList] = useState(false);

  const cx = classNames.bind(styles);

  // useEffect(() => {
  //   Promise.all([getShowMainMyMenu(), getMyMenuData()]).then(res => {
  //     console.log(res);
  //     setShowMyMenu(res[0].data.data);
  //     if (res[1].data.data.length !== 0) {
  //       setInfo(res[1].data.data);
  //     } else {
  //       setIsEmpty(true);
  //       setIsFetching(true);
  //     }
  //   });
  // }, [isDeleteMyMenu, isChangeMyMenuName]);
  useEffect(() => {
    getMyMenuData().then(res => {
      console.log('삭제전', res.data.data);
      if (res.data.data.length !== 0) {
        setInfo(res.data.data);
        console.log('최초', res.data.data);
      } else {
        setIsEmpty(true);
        setIsFetching(true);
      }
    });
  }, [isDeleteMyMenu, isChangeMyMenuList]);
  useEffect(() => {
    console.log('갱신', info);
  }, [info]);
  const handleShowMainMyMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeShowMainMyMenu().then(res => {
      console.log('res : ', res);
    });
  };

  const handleClickChangeOrderBtn = () => {
    setIsClickChangeOrderBtn(prev => {
      return !prev;
    });
  };

  return (
    <>
      {isClickChangeOrderBtn && (
        <ChangeOrderMyMenuModal
          info={info}
          setIsClickChangeOrderBtn={setIsClickChangeOrderBtn}
        />
      )}
      <div className={cx('wrap')}>
        <h2>나만의 메뉴</h2>
        <div className={cx('option-wrap')}>
          {isFetching && (
            <div className={cx('input-wrap')}>
              <label>HOME에서 바로 주문</label>
              <ToggleCheckbox
                defaultChecked={showMyMenu}
                onChange={handleShowMainMyMenu}
                value=''
              />
            </div>
          )}
          <button
            type='button'
            className={cx('sort-btn')}
            onClick={handleClickChangeOrderBtn}
            disabled={isEmpty || info?.length === 1}
          >
            <Image
              src='/assets/svg/icon-sort-arrow.svg'
              width={13}
              height={13}
            />
            순서변경
          </button>
        </div>
        {isEmpty && <EmptyMyMenu />}
        <ul>
          {info &&
            info.map((item: IMenuData1) => (
              <MyMenuItem
                key={item.index}
                item={item}
                isFetching={isFetching}
                isEmpty={isEmpty}
                setIsFetching={setIsFetching}
                setIsDeleteMyMenu={setIsDeleteMyMenu}
                setIsChangeMyMenuName={setIsChangeMyMenuName}
                setInfo={setInfo}
                setIsChangeMyMenuList={setIsChangeMyMenuList}
                isChangeMyMenuList={isChangeMyMenuList}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default myMenuContent;
