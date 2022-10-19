import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/changeOrderMyMenu.module.scss';
import { IMenuData1 } from '../../../src/types/myMenu.d';
import DndMyMenuItem from '../ui/dndMyMenuItem';

interface IProps {
  info: IMenuData1[];
  setIsClickChangeOrderBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function changeOrderMyMenuModal({ setIsClickChangeOrderBtn }: IProps) {
  const cx = classNames.bind(styles);

  const handleClickCloseBtn = () => {
    setIsClickChangeOrderBtn(prev => {
      return !prev;
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <form className={cx('wrap')} onSubmit={handleSubmit}>
      <div className={cx('tit-wrap')}>
        <h2>나만의 메뉴 순서 변경</h2>
        <button
          type='button'
          className={cx('close-btn')}
          onClick={handleClickCloseBtn}
        >
          <img src='/assets/svg/icon-x-mark.svg' alt='닫기' />
        </button>
      </div>
      <ul>
        <DndMyMenuItem />
        <DndMyMenuItem />
        <DndMyMenuItem />
      </ul>
      <div className={cx('btn-wrap')}>
        <button
          type='button'
          className={cx('cancel-btn')}
          onClick={handleClickCloseBtn}
        >
          취소
        </button>
        <button type='submit' className={cx('submit-btn')}>
          순서 변경하기
        </button>
      </div>
    </form>
  );
}

export default changeOrderMyMenuModal;
