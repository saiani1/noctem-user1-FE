import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/pages/categoryPage.module.scss';
import CategoryItem from './categoryItem';
import { categoryList } from '../../public/assets/datas/categoryList';
import { categoryNewData } from '../../public/assets/datas/categoryNewData';

const cx = classNames.bind(styles);

function categoryContent() {
  const [isClick, setIsClick] = useState(0);
  const [menuList, setMenuList] = useState([]);

  return (
    <>
      <div className={cx('menu-bar')}>
        <div>음료</div>
        <div>푸드</div>
        <div className={cx('search-bar')}>
          <div />
          <div className={cx('search-icon')}>
            <Image
              src='/assets/svg/icon-search.svg'
              alt='search'
              width={24}
              height={21}
            />
          </div>
        </div>
        <div>
          <Image
            src='/assets/svg/icon-cart.svg'
            alt='cart'
            width={24}
            height={21}
          />
        </div>
      </div>
      <div className={cx('menu-category')}>
        <ul>
          {categoryList &&
            categoryList.map(item => {
              return (
                <CategoryItem
                  key={item.id}
                  list={item}
                  setIsClick={setIsClick}
                  isClick={isClick}
                />
              );
            })}
        </ul>
      </div>
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

export default categoryContent;
