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
    console.log(list.name);
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
            src={
              sizeChoice === list.name
                ? '/assets/svg/icon-cup-click.svg'
                : '/assets/svg/icon-cup.svg'
            }
            alt='cup-size'
            width={list.size / 10}
            height={list.size / 10}
          />
        </div>
        <div>{list.name}</div>
        <div>{list.size}ml</div>
      </div>
    </>
  );
}

export default cupSizeItem;
