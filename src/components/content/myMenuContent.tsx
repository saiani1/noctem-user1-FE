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
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../store/atom/userStates';

function myMenuContent() {
  const token = useRecoilValue(tokenState);
  const [isClickChangeOrderBtn, setIsClickChangeOrderBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [info, setInfo] = useState<IMenuData1[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleteMyMenu, setIsDeleteMyMenu] = useState(false);
  const [isChangeMyMenuName, setIsChangeMyMenuName] = useState(false);
  const [showMyMenu, setShowMyMenu] = useState(false);

  const cx = classNames.bind(styles);

  useEffect(() => {
    Promise.all([getShowMainMyMenu(token), getMyMenuData(token)]).then(res => {
      console.log(res);
      setShowMyMenu(res[0].data.data);
      if (res[1].data.data.length !== 0) {
        setInfo(res[1].data.data);
      } else {
        setIsEmpty(true);
        setIsFetching(true);
      }
    });
  }, [isDeleteMyMenu, isChangeMyMenuName]);

  const handleShowMainMyMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeShowMainMyMenu(token).then(res => {
      console.log('res : ', res);
    });
  };

  const handleDeleteMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    const name = (e.target as HTMLInputElement).name;
    console.log('ID', name);
    deleteMyMenu(name, token).then(res => {
      console.log(res);
      setIsDeleteMyMenu(true);
      toast.success('나만의 메뉴가 삭제되었습니다.');
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
                handleDeleteMenu={handleDeleteMenu}
                setIsFetching={setIsFetching}
                setIsDeleteMyMenu={setIsDeleteMyMenu}
                setIsChangeMyMenuName={setIsChangeMyMenuName}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default myMenuContent;
