import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/pages/productPage.module.scss';

interface IProps {
  myMenuNameRef: React.ForwardedRef<HTMLInputElement>;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddMyMenuData: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function myMenuRenamePopUp({
  myMenuNameRef,
  handleClose,
  handleAddMyMenuData,
}: IProps) {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('menu-name-alert')}>
      <div className={cx('my-menu')}>
        <div>
          <h3>나만의 메뉴로 등록해보세요</h3>
        </div>
        <div className={cx('menu-info')}>
          <h4>카페 아메리카노</h4>
          <div>속성</div>
        </div>
        <div className={cx('menu-nickname')}>
          <p>등록할 나만의 메뉴 이름을 지어보세요.</p>
          <input
            type='text'
            placeholder='나만의 카페 아메리카노'
            name='input-nickname'
            // onChange={checkMenuName}
            ref={myMenuNameRef}
          />
        </div>
        <div className={cx('button-container')}>
          <button type='button' onClick={handleClose}>
            취소
          </button>
          <button type='button' onClick={handleAddMyMenuData}>
            확인
          </button>
        </div>
      </div>
      <div className={cx('background')} />
    </div>
  );
}

export default myMenuRenamePopUp;
