import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';

const cx = classNames.bind(styles);

function productContent() {
  const [orderOption, setOrderOption] = useState(false);
  const handleOrder = () => {
    console.log('열려라 옵션');
    setOrderOption(!orderOption);
  };
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
          <li>new</li>
          <li>추천</li>
          <li>리프레셔</li>
          <li>콜드브루</li>
          <li>블론드</li>
          <li>에스프레소</li>
          <li>디카페인 커피</li>
          <li>프라푸치노</li>
          <li>블렌디드</li>
          <li>피지오</li>
          <li>티바나</li>
          <li>브루드 커피</li>
          <li>기타</li>
          <li>병음료</li>
        </ul>
      </div>
      <div className={cx('product-img')}>
        <img
          src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
          alt=''
        />
      </div>
      <div className={cx('product-detail')}>
        <div className={cx('product-name')}>아이스 카페 아메리카노</div>
        <div className={cx('product-english-name')}>Iced Caffe Americano</div>
        <div className={cx('product-content')}>
          진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고
          강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피
        </div>
        <div className={cx('product-price')}>4,500원</div>
        <div className={cx('temp-button')}>
          <div className={cx('hot')}>HOT</div>
          <div className={cx('iced')}>ICED</div>
        </div>
      </div>

      <hr className={cx('line')} />
      <button
        className={cx('order-button')}
        type='button'
        onClick={handleOrder}
      >
        주문하기
      </button>
    </>
  );
}

export default productContent;
