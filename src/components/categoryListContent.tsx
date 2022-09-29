import React from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryContent from './categoryContent';

const cx = classNames.bind(styles);

function categoryListContent({
  categoryName,
  setCategoryName,
}: {
  categoryName: string;
  setCategoryName: any;
}) {
  return (
    <>
      <CategoryContent setCategoryName={setCategoryName} />
      <ul>
        <Link href='/product'>
          <li className={cx('menu-item')}>
            <div className={cx('menu-img')}>
              <img
                src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
                alt=''
              />
            </div>
            <div className={cx('menu-detail')}>
              <div className={cx('item-name')}>아이스 블랙 그레이즈드 라떼</div>
              <div className={cx('item-english-name')}>
                Iced Black Grazed Latte
              </div>
              <div className={cx('item-price')}>6,300원</div>
            </div>
          </li>
        </Link>
      </ul>
      {categoryName}
      <div className={cx('choice-store')}>
        <div>
          <div>주문할 매장을 선택하세요</div>
          <div>
            <Image
              src='/assets/svg/icon-down-arrow.svg'
              alt='down-arrow'
              width={24}
              height={21}
            />
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default categoryListContent;
