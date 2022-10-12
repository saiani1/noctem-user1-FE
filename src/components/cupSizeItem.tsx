import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';
import { ISizeProps } from '../types/productDetail';

const cx = classNames.bind(styles);

function cupSizeItem({
  list,
  selecteSizeTxt,
  setSelecteSizeTxt,
  data,
  setData,
}: {
  list: ISizeProps['list'];
  selecteSizeTxt: ISizeProps['selecteSizeTxt'];
  setSelecteSizeTxt: ISizeProps['setSelecteSizeTxt'];
  data: ISizeProps['data'];
  setData: ISizeProps['setData'];
}) {
  const handleChoice = () => {
    setSelecteSizeTxt(list.size);
    setData({
      ...data,
      sizeId: list.sizeId,
    });
  };

  useEffect(() => {
    console.log(list);
  }, []);

  return (
    <>
      {list && (
        <div
          className={
            selecteSizeTxt === list.size ? cx('cup-card-click') : cx('cup-card')
          }
          role='sizeitem'
          onClick={handleChoice}
          onKeyDown={handleChoice}
        >
          <div className={cx('cup-image-box')}>
            <Image
              src={
                selecteSizeTxt === list.size
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
