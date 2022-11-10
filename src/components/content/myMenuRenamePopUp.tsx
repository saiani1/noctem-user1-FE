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
  temperatureChoice: number;
  cupChoice: string;
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
  cupChoice,
  myMenuNameRef,
  handleClose,
  handleAddMyMenuData,
}: IProps) {
  const cx = classNames.bind(styles);
  const [temperature, setTemperature] = useState('ICE');

  useEffect(() => {
    if (temperatureChoice === 0) setTemperature('ICE');
    else setTemperature('HOT');
  }, []);

  return (
    <div className={cx('menu-name-alert')}>
      <div className={cx('my-menu')}>
        {prevPage === 'myMenu' ? (
          itemInfo && (
            <>
              <div>
                <h3>나만의 메뉴 이름을 수정해보세요.</h3>
              </div>
              <div className={cx('menu-info')}>
                <h4>{itemInfo.menuName}</h4>
                <div className={cx('menu-option')}>
                  {itemInfo.temperature.toUpperCase()} | {itemInfo.size} |{' '}
                  {cupChoice}
                </div>
              </div>
              <div className={cx('menu-nickname')}>
                <p>수정할 나만의 메뉴 이름을 지어보세요.</p>
                <input
                  type='text'
                  placeholder={item?.alias}
                  name='input-nickname'
                  ref={myMenuNameRef}
                />
              </div>
            </>
          )
        ) : (
          <>
            <div>
              <h3>나만의 메뉴로 등록해보세요</h3>
            </div>
            <div className={cx('menu-info')}>
              <h4>{detailList?.temperatureList[temperatureChoice].menuName}</h4>
              <div className={cx('menu-option')}>
                {temperature.toUpperCase()} | {selectedSizeTxt} | {cupChoice}
              </div>
            </div>
            <div className={cx('menu-nickname')}>
              <p>등록할 나만의 메뉴 이름을 지어보세요.</p>
              <input
                type='text'
                placeholder={
                  detailList?.temperatureList[temperatureChoice].menuName
                }
                name='input-nickname'
                ref={myMenuNameRef}
              />
            </div>
          </>
        )}
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
