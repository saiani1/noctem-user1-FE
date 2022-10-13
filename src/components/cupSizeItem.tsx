import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';
import { ISizeProps } from '../types/productDetail';

const cx = classNames.bind(styles);

function cupSizeItem({
  list,
  selectedSizeTxt,
  setSelectedSizeTxt,
  cartData,
  setCartData,
}: {
  list: ISizeProps['list'];
  selectedSizeTxt: ISizeProps['selectedSizeTxt'];
  setSelectedSizeTxt: ISizeProps['setSelectedSizeTxt'];
  cartData: ISizeProps['cartData'];
  setCartData: ISizeProps['setCartData'];
}) {
  const handleChoice = () => {
    console.log(list.sizeId);
    setSelectedSizeTxt(list.size);
    setCartData({
      ...cartData,
      sizeId: list.sizeId,
    });
  };

  return (
    <>
      {list && (
        <div
          className={
            selectedSizeTxt === list.size
              ? cx('cup-card-click')
              : cx('cup-card')
          }
          role='sizeitem'
          onClick={handleChoice}
          onKeyDown={handleChoice}
        >
          <div className={cx('cup-image-box')}>
            <Image
              src={
                selectedSizeTxt === list.size
                  ? '/assets/svg/icon-cup-click.svg'
                  : '/assets/svg/icon-cup.svg'
              }
              alt='cup-size'
              width={(list.index + 5) * 6}
              height={(list.index + 5) * 6}
            />
          </div>
          <div>{list.size}</div>
          <div>{list.capacity}ml</div>
        </div>
      )}
    </>
  );
}

export default cupSizeItem;
