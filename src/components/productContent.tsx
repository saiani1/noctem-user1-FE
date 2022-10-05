import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';
import CategoryContent from './categoryContent';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import SheetContent from './common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import ToolbarList from './ui/toolbarList';
import { sizeDatas } from '../../public/assets/datas/sizeDatas';
import CupSizeItem from './cupSizeItem';
import { cupDatas } from '../../public/assets/datas/cupDatas';

const cx = classNames.bind(styles);

function productContent() {
  const [orderOption, setOrderOption] = useState(false);
  const handleOrder = () => {
    setOrderOption(!orderOption);
  };
  const [isClick, setIsClick] = useState(0);
  const [categoryName, setCategoryName] = useState('new');
  const sheetRef = useRef<BottomSheetRef>;
  const [open, setOpen] = useState(false);
  const [sizeChoice, setSizeChoice] = useState('');
  const [cupChoice, setCupChoice] = useState('');
  const handleChoiceCup = (e: string) => {
    setCupChoice(e);
  };
  function onDismiss() {
    setOpen(false);
  }
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
          onClick={() => setOpen(true)}
        >
          주문하기
        </button>
      </div>
      <BottomSheet open={open} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <div className={cx('option-box')}>
            <div className={cx('option', 'fadeIn')}>
              <div className={cx('menu-title')}>아이스 카페 아메리카노</div>
              <div>
                <div className={cx('option-title')}>사이즈</div>
                <div className={cx('cup-size')}>
                  {/* cup size seledt */}
                  {sizeDatas &&
                    sizeDatas.map(item => (
                      <CupSizeItem
                        key={item.id}
                        list={item}
                        sizeChoice={sizeChoice}
                        setSizeChoice={setSizeChoice}
                      />
                    ))}
                </div>
              </div>
              <div>
                <div className={cx('option-title')}>컵 선택</div>
                <div className={cx('cup-kind')}>
                  {/* cup select */}
                  {cupDatas &&
                    cupDatas.map(item => (
                      <div
                        key={item.id}
                        role='cupitem'
                        onClick={() => handleChoiceCup(item.name)}
                        onKeyDown={() => handleChoiceCup(item.name)}
                        className={
                          cupChoice === item.name
                            ? cx('click-cup')
                            : cx('non-click')
                        }
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              </div>
              <div className={cx('bottom-order-bar')}>
                <hr className={cx('line')} />
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
                      <div className={cx('go-order')} onClick={handleOrder}>
                        주문하기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
      {open ? undefined : <ToolbarList />}
    </>
  );
}

export default productContent;
