import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';
import CategoryContent from './categoryContent';
import CategoryItem from './categoryItem';
import { categoryList } from '../../public/assets/datas/categoryList';

const cx = classNames.bind(styles);

function productContent() {
  const [orderOption, setOrderOption] = useState(false);
  const handleOrder = () => {
    setOrderOption(!orderOption);
  };
  const [isClick, setIsClick] = useState(0);
  const [categoryName, setCategoryName] = useState('new');
  return (
    <>
      <CategoryContent setCategoryName={setCategoryName} />
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
      <div className={cx('button-box')}>
        <button
          className={cx('order-button')}
          type='button'
          onClick={handleOrder}
        >
          주문하기
        </button>
      </div>

      {orderOption ? (
        <div className={cx('option-box')}>
          <div
            className={cx('background')}
            role='presentation'
            onClick={handleOrder}
            onKeyDown={handleOrder}
          />
          <div className={cx('option', 'fadeIn')}>
            <div className={cx('top-bar')} />
            <div className={cx('menu-title')}>아이스 카페 아메리카노</div>
            <div>
              <div className={cx('option-title')}>사이즈</div>
              <div className={cx('cup-size')}>
                <div className={cx('cup-card')}>
                  <div className={cx('cup-image-box')}>
                    <Image
                      src='/assets/svg/icon-cup-size.svg'
                      alt='cup-size'
                      width={26}
                      height={26}
                    />
                  </div>
                  <div>Tall</div>
                  <div>335ml</div>
                </div>
                <div className={cx('cup-card')}>
                  <div className={cx('cup-image-box')}>
                    <Image
                      src='/assets/svg/icon-cup-size.svg'
                      alt='cup-size'
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>Grande</div>
                  <div>473ml</div>
                </div>
                <div className={cx('cup-card')}>
                  <div className={cx('cup-image-box')}>
                    <Image
                      src='/assets/svg/icon-cup-size.svg'
                      alt='cup-size'
                      width={44}
                      height={44}
                    />
                  </div>
                  <div>Venti</div>
                  <div>591ml</div>
                </div>
              </div>
            </div>
            <div>
              <div className={cx('option-title')}>컵 선택</div>
              <div className={cx('cup-kind')}>
                <div>매장컵</div>
                <div>개인 컵</div>
                <div>일회용 컵</div>
              </div>
            </div>
            <div className={cx('bottom-order-bar')}>
              <hr />
              <div>
                <div className={cx('total-cost')}>
                  <div className={cx('control-count')}>
                    <div>
                      <Image
                        src='/assets/svg/icon-minus.svg'
                        alt='minus'
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>1</div>
                    <div>
                      <Image
                        src='/assets/svg/icon-plus.svg'
                        alt='plus'
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className={cx('total-price')}>5,000원</div>
                </div>
                <div className={cx('order-select')}>
                  <div className={cx('add-heart')}>
                    <Image
                      src='/assets/svg/icon-heart.svg'
                      alt='heart'
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>
                    <div className={cx('go-cart')}>담기</div>
                    <div className={cx('go-order')}>주문하기</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
}

export default productContent;
