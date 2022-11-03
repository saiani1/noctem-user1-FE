import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import classNames from 'classnames/bind';
import styles from '../../../../styles/pages/productPage.module.scss';
import CupSizeItem from '../../cupSizeItem';
import { cupDatas } from '../../../../public/assets/datas/cupDatas';
import { addComma } from '../../../store/utils/function';
import { ISize, IDetail, ICartData } from '../../../types/productDetail';
import { HeartBtn, MinusBtn, PlusBtn } from '../../../../public/assets/svg';

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
  selectedSizeTxt,
  setSelectedSizeTxt,
  setSelectedSizeId,
  cartData,
}: {
  open: boolean;
  onDismiss: any;
  detailList: IDetail | undefined;
  sizeOpt: ISize[] | undefined;
  setCupChoice: React.Dispatch<React.SetStateAction<string>>;
  cupChoice: string;
  setCartData: React.Dispatch<React.SetStateAction<ICartData>>;
  handleAddMyMenu: () => void;
  handleAddCart: () => void;
  handleOrder: () => void;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  selectedSizeTxt: string;
  setSelectedSizeTxt: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSizeId: React.Dispatch<React.SetStateAction<number>>;
  cartData: ICartData;
}) {
  //   const [count, setCount] = useState(1);
  const [drinkNickname, setDrinkNickname] = useState('');
  const [extraCost, setExtraCost] = useState(0);
  const handleChoiceCup = (e: string) => {
    setCupChoice(e);
    setCartData({ ...cartData, cupType: e });
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

  const checkMymenu = (e: string) => {
    setDrinkNickname(e);
    console.log(drinkNickname);
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
                        setExtraCost={setExtraCost}
                        setSelectedSizeId={setSelectedSizeId}
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
                        <MinusBtn
                          className={cx('icon', count === 1 ? '' : 'active')}
                        />
                      </div>
                      <div>{count}</div>
                      <div onClick={handlePlus}>
                        <PlusBtn
                          className={cx('icon', count === 20 ? '' : 'active')}
                        />
                      </div>
                    </div>
                    <div className={cx('total-price')}>
                      {detailList && addComma(detailList.price + extraCost)}원
                    </div>
                  </div>
                  <div className={cx('order-select')}>
                    <button
                      type='button'
                      className={cx('add-heart')}
                      onClick={handleAddMyMenu}
                    >
                      <HeartBtn className={cx('icon')} />
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
