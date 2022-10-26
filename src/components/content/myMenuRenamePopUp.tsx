import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/pages/productPage.module.scss';
import { IMenuData1, IMenuDetailData } from '../../../src/types/myMenu.d';
import { IDetail } from '../../types/productDetail';

interface IProps {
  prevPage: string;
  item?: IMenuData1;
  itemInfo?: IMenuDetailData;
  detailList?: IDetail;
  selectedSizeTxt?: string;
  temperatureChoice?: number;
  myMenuNameRef: React.ForwardedRef<HTMLInputElement>;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddMyMenuData: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function myMenuRenamePopUp({
  prevPage,
  item,
  itemInfo,
  detailList,
  selectedSizeTxt,
  temperatureChoice,
  myMenuNameRef,
  handleClose,
  handleAddMyMenuData,
}: IProps) {
  const cx = classNames.bind(styles);
  const [temperature, setTemperature] = useState('ice');

  console.log(temperatureChoice, temperature);
  useEffect(() => {
    if (temperatureChoice === 0) setTemperature('ice');
    else setTemperature('hot');
  }, []);

  return (
    <div className={cx('menu-name-alert')}>
      <div className={cx('my-menu')}>
        <div>
          <h3>
            나만의 메뉴
            {prevPage === 'myMenu'
              ? ' 이름을 수정해보세요.'
              : '로 등록해보세요'}
          </h3>
        </div>
        <div className={cx('menu-info')}>
          <h4>
            {prevPage === 'myMenu'
              ? itemInfo?.menuName
              : temperatureChoice &&
                detailList?.temperatureList[temperatureChoice].menuName}
          </h4>
          <div className={cx('menu-option')}>
            {prevPage === 'myMenu' ? itemInfo?.temperature : temperature} |{' '}
            {prevPage === 'myMenu' ? itemInfo?.size : selectedSizeTxt}
          </div>
        </div>
        <div className={cx('menu-nickname')}>
          <p>
            {prevPage === 'myMenu' ? '수정할' : '등록할'} 나만의 메뉴 이름을
            지어보세요.
          </p>
          <input
            type='text'
            placeholder={
              prevPage === 'myMenu'
                ? item?.alias
                : detailList?.temperatureList[0].menuName
            }
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
