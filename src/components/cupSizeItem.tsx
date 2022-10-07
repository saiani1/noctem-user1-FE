import React from 'react';
import classNames from 'classnames/bind';
import { IProps } from '../types/size.d';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';

const cx = classNames.bind(styles);

function cupSizeItem({
  list,
  sizeChoice,
  setSizeChoice,
  data,
  setData,
}: {
  list: IProps['list'];
  sizeChoice: IProps['sizeChoice'];
  setSizeChoice: IProps['setSizeChoice'];
  data: IProps['data'];
  setData: IProps['setData'];
}) {
  const handleChoice = () => {
    setSizeChoice(list.size);
    setData({
      ...data,
      sizeId: list.sizeId,
    });
  };
  return (
    <>
      {list && (
        <div
          className={
            sizeChoice === list.size ? cx('cup-card-click') : cx('cup-card')
          }
          role='sizeitem'
          onClick={handleChoice}
          onKeyDown={handleChoice}
        >
          <div className={cx('cup-image-box')}>
            <Image
              src={
                sizeChoice === list.size
                  ? '/assets/svg/icon-cup-click.svg'
                  : '/assets/svg/icon-cup.svg'
              }
              alt='cup-size'
              width={(list.index + 5) * 6}
              height={(list.index + 5) * 6}
            />
          </div>
          <div>{list.size}</div>
          {list.size === 'Tall' && <div>335ml</div>}
          {list.size === 'Grande' && <div>473ml</div>}
          {list.size === 'Venti' && <div>591ml</div>}
        </div>
      )}
    </>
  );
}

export default cupSizeItem;
