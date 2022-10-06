import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/pages/productPage.module.scss';
import CategoryContent from './categoryContent';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from './common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import ToolbarList from './ui/toolbarList';
import CupSizeItem from './cupSizeItem';
import { cupDatas } from '../../public/assets/datas/cupDatas';
import { useRouter } from 'next/router';
import { getSize, getTemperature } from '../../pages/api/category';
import { addCart } from '../../pages/api/cart';
import { useRecoilState } from 'recoil';
import { categoryLState, categorySIdState } from '../store/atom/categoryState';
import { ISize } from '../types/size';

const cx = classNames.bind(styles);

interface IDetail {
  index: number;
  temperatureId: number;
  menuId: number;
  menuName: string;
  menuEngName: string;
  description: string;
  menuImg: string;
  temperature: string;
  price: number;
}

interface IData {
  sizeId: number;
  quantity: number;
  personalOptionList?: IPersonalOption[];
}

interface IPersonalOption {
  optionId: number;
  amount: string;
}

function productContent() {
  const router = useRouter();
  const id = router.query.id ? +router.query.id : 1;
  const [categoryName, setCategoryName] = useRecoilState(categoryLState);
  const [categorySId, setCategorySId] = useRecoilState(categorySIdState);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IData>();
  const [sizeOpt, setSizeOpt] = useState<ISize[]>();
  const [sizeChoice, setSizeChoice] = useState();
  const [cupChoice, setCupChoice] = useState('');
  const [count, setCount] = useState(1);
  const [detailList, setdetailList] = useState<IDetail[]>([]);
  const [temperatureChoice, setTemperatureChoice] = useState('ice');

  useEffect(() => {
    console.log('선택한 사이즈 : ', sizeChoice);
  }, [sizeChoice]);

  const handleOptionOpen = () => {
    setOpen(true);
    getSize(detailList[0].menuId).then(res => {
      console.log(res);
      setSizeOpt(res.data.data);
      setSizeChoice(res.data.data[0].size);
    });
  };

  const handleAddCart = () => {
    if (cupChoice === '') {
      alert('컵을 선택하세요.');
    } else {
      console.log('카트 넣자');
      addCart().then(res => {
        console.log(res);
      });
    }

    console.log(sizeChoice);
    console.log(cupChoice);
    console.log(count);
  };

  const handleOrder = () => {};

  const handleMinus = () => {
    if (count > 1) {
      setCount(prev => {
        return --prev;
      });
    }
  };

  const handlePlus = () => {
    setCount(prev => {
      return ++prev;
    });
  };

  const handleTempChoice = (e: string) => {
    setTemperatureChoice(e);
  };

  const handleChoiceCup = (e: string) => {
    setCupChoice(e);
  };

  function onDismiss() {
    setOpen(false);
  }

  useEffect(() => {
    getTemperature(id).then(res => {
      console.log(res.data.data);
      setdetailList(res.data.data);
    });
  }, []);

  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        setCategorySId={setCategorySId}
      />
      <div className={cx('product-img')}>
        <img src={detailList[0] && detailList[0].menuImg} alt='' />
      </div>
      <div className={cx('product-detail')}>
        <div className={cx('product-name')}>
          {detailList[0] && detailList[0].menuName}
        </div>
        <div className={cx('product-english-name')}>
          {detailList[0] && detailList[0].menuEngName}
        </div>
        <div className={cx('product-content')}>
          {detailList[0] && detailList[0].description}
        </div>
        <div className={cx('product-price')}>
          {detailList[0] && detailList[0].price}
        </div>

        <div className={cx('temp-button')}>
          {detailList && detailList.length < 2 ? (
            <div
              className={
                detailList[0] && detailList[0].temperature === 'hot'
                  ? cx('only-hot')
                  : cx('only-ice')
              }
            >
              {detailList[0] && detailList[0].temperature === 'hot' ? (
                <div>HOT ONLY</div>
              ) : (
                <div>ICED ONLY</div>
              )}
            </div>
          ) : (
            <>
              <div
                className={
                  temperatureChoice === 'hot' ? cx('hot') : cx('hot-unclicked')
                }
                onClick={() => handleTempChoice('hot')}
                onKeyDown={() => handleTempChoice('hot')}
              >
                HOT
              </div>
              <div
                className={
                  temperatureChoice === 'ice'
                    ? cx('iced')
                    : cx('iced-unclicked')
                }
                onClick={() => handleTempChoice('ice')}
                onKeyDown={() => handleTempChoice('ice')}
              >
                ICED
              </div>
            </>
          )}
        </div>
      </div>
      <hr className={cx('line')} />
      <div className={cx('button-box')}>
        <button
          className={cx('order-button')}
          type='button'
          onClick={handleOptionOpen}
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
                  {sizeOpt &&
                    sizeOpt.map(item => (
                      <CupSizeItem
                        key={item.index}
                        list={item}
                        sizeChoice={sizeChoice}
                        setSizeChoice={setSizeChoice}
                        setData={setData}
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
                            count > 1
                              ? '/assets/svg/icon-minus-active.svg'
                              : '/assets/svg/icon-minus.svg'
                          }
                          alt='minus'
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>{count}</div>
                      <div onClick={handlePlus}>
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
      {open ? undefined : <ToolbarList />}
    </>
  );
}

export default productContent;
