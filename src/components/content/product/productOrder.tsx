import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../../styles/pages/productPage.module.scss';
import CupSizeItem from '../../cupSizeItem';
import { cupDatas } from '../../../../public/assets/datas/cupDatas';
import { addComma } from '../../../store/utils/function';
import { ISize, IDetail } from '../../../types/productDetail';

const cx = classNames.bind(styles);

function productOrder({
  open,
  onDismiss,
  detailList,
  sizeOpt,
  setCupChoice,
  cupChoice,
  setCartData,
  handleAddMyMenu,
  handleAddCart,
  handleOrder,
  count,
  setCount,
}: {
  open: boolean;
  onDismiss: any;
  detailList: IDetail;
  sizeOpt: ISize;
  setCupChoice: any;
  cupChoice: any;
  setCartData: any;
  handleAddMyMenu: any;
  handleAddCart: any;
  handleOrder: any;
  count: number;
  setCount: any;
}) {
  //   const [count, setCount] = useState(1);
  const handleChoiceCup = (e: string) => {
    setCupChoice(e);
  };
  const handleMinus = () => {
    if (count > 1) {
      setCount(prev => {
        return --prev;
      });
      setCartData(prev => {
        return {
          ...prev,
          quantity: --prev.quantity,
        };
      });
    }
  };

  const handlePlus = () => {
    if (count < 20) {
      setCount(prev => {
        return ++prev;
      });
      setCartData(prev => {
        return {
          ...prev,
          quantity: ++prev.quantity,
        };
      });
    }
  };
  return (
    <>
      <BottomSheet open={open} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <div className={cx('option-box')}>
            <div className={cx('option', 'fadeIn')}>
              <div className={cx('menu-title')}>
                {detailList && detailList.temperatureList[0].menuName}
              </div>
              <div>
                <div className={cx('option-title')}>사이즈</div>
                <div className={cx('cup-size')}>
                  {/* cup size seledt */}
                  {sizeOpt &&
                    sizeOpt.map(item => (
                      <CupSizeItem
                        key={item.index}
                        list={item}
                        selectedSizeTxt={selectedSizeTxt}
                        setSelectedSizeTxt={setSelectedSizeTxt}
                        cartData={cartData}
                        setCartData={setCartData}
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
                      <div onClick={handleMinus}>
                        <Image
                          src={
                            count === 1
                              ? '/assets/svg/icon-minus.svg'
                              : '/assets/svg/icon-minus-active.svg'
                          }
                          alt='minus icon'
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>{count}</div>
                      <div onClick={handlePlus}>
                        <Image
                          src={
                            count === 20
                              ? '/assets/svg/icon-plus.svg'
                              : '/assets/svg/icon-plus-active.svg'
                          }
                          alt='plus icon'
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                    <div className={cx('total-price')}>
                      {detailList && addComma(detailList.price)}원
                    </div>
                  </div>
                  <div className={cx('order-select')}>
                    <button
                      type='button'
                      className={cx('add-heart')}
                      onClick={handleAddMyMenu}
                    >
                      <span>
                        <Image
                          src='/assets/svg/icon-heart.svg'
                          alt='heart'
                          width={30}
                          height={30}
                        />
                      </span>
                    </button>
                    <div>
                      <div className={cx('go-cart')} onClick={handleAddCart}>
                        담기
                      </div>
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
    </>
  );
}

export default productOrder;
