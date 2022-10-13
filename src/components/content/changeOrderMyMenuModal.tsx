import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/changeOrderMyMenu.module.scss';
import { IMenu } from '../../../src/types/myMenu.d';

interface IProps {
  info: IMenu[];
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
        <li className={cx('content-wrap')}>
          <div className={cx('left')}>
            <strong>딸기 아사이 스타벅스 리프레셔</strong>
            <span>ICED | Tall | 개인컵</span>
          </div>
          <img src='/assets/svg/icon-hamburger.svg' />
        </li>
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
