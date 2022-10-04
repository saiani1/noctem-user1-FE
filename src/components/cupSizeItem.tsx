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
}: {
  list: IProps['list'];
  sizeChoice: string;
  setSizeChoice: any;
}) {
  const handleChoice = () => {
    setSizeChoice(list.name);
  };
  return (
    <>
      <div
        className={
          sizeChoice === list.name ? cx('cup-card-click') : cx('cup-card')
        }
        role='sizeitem'
        onClick={handleChoice}
        onKeyDown={handleChoice}
      >
        <div className={cx('cup-image-box')}>
          <Image
            src='/assets/svg/icon-cup-size.svg'
            alt='cup-size'
            width={26}
            height={26}
          />
        </div>
        <div>{list.name}</div>
        <div>{list.size}ml</div>
      </div>
    </>
  );
}

export default cupSizeItem;
