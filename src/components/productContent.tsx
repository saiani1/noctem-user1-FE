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
import { getSize, getNutrition, getProduct } from '../../pages/api/category';
import { addCart, getCount } from '../../pages/api/cart';
import { useRecoilState } from 'recoil';
import { categoryLState, categorySIdState } from '../store/atom/categoryState';
import {
  ICartData,
  ICartNonMemberData,
  IDetail,
  ISize,
  INutrition,
} from '../types/productDetail';
import ProductNurtitionInfo from './productNutritionInfo';
import { cartCnt } from '../store/atom/userStates';

const cx = classNames.bind(styles);

function productContent() {
  const router = useRouter();
  const id = router.query.id ? +router.query.id : 1;
  const [categoryName, setCategoryName] = useRecoilState(categoryLState);
  const [categorySId, setCategorySId] = useRecoilState(categorySIdState);
  const [cartCount, setCartCount] = useRecoilState(cartCnt);
  const [open, setOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [data, setData] = useState<ICartData>({
    // 사이즈, 개수, 컵 종류, 온도
    sizeId: 1,
    quantity: 1,
    personalOptionList: [],
  });
  const [nonMemberData, setNonMemberData] = useState<ICartNonMemberData>({
    options: {
      sizeId: 1,
      quantity: 1,
      personalOptionList: [],
    },
    menuImg: '',
    menuName: '',
    menuEngName: '',
    temperature: '',
    totalMenuPrice: '',
  });
  const [sizeOpt, setSizeOpt] = useState<ISize[]>();
  const [selecteSizeTxt, setSelecteSizeTxt] = useState('');
  const [cupChoice, setCupChoice] = useState('');
  const [count, setCount] = useState(1);
  const [detailList, setdetailList] = useState<IDetail>();
  const [chioceTempId, setChioceTempId] = useState<number>();
  const [temperatureChoice, setTemperatureChoice] = useState('hot');
  const [nutritionInfo, setNutritionInfo] = useState<INutrition>();
  const [nutritionSize, setNutritionSize] = useState('Tall');

  const handleOptionOpen = () => {
    setOpen(true);
  };
  const handleNutritionOpen = () => {
    setNutritionOpen(true);
  };
  const handleNutritionSize = (name: string) => {
    setNutritionSize(name);
  };

  const handleAddCart = () => {
    console.log(detailList);
    if (cupChoice === '') {
      alert('컵을 선택하세요.');
    } else {
      const sum = cartCount + count;
      if (sum > 20) {
        alert('총 20개까지 담을 수 있습니다.');
        return;
      }

      if (localStorage.getItem('token') === null) {
        // 사진, 이름, 영문, 온도, 컵 사이즈, 컵 종류, 양, 가격
        sessionStorage.setItem(
          sessionStorage.length + '',
          JSON.stringify(data),
        );
      } else {
        addCart(data);
      }
      setOpen(false);
      alert('장바구니에 담겼습니다!');
    }
  };

  const handleOrder = () => {};

  const handleMinus = () => {
    if (count > 1) {
      setCount(prev => {
        return --prev;
      });
      setData(prev => {
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
      setData(prev => {
        return {
          ...prev,
          quantity: ++prev.quantity,
        };
      });
    }
  };

  const handleTempChoice = (e: string) => {
    setTemperatureChoice(e);
  };

  const handleChoiceCup = (e: string) => {
    setCupChoice(e);
  };

  function onDismiss() {
    setOpen(false);
    setNutritionOpen(false);
  }

  const handleAddMyMenu = (e: any) => {
    if (selecteSizeTxt === '' || cupChoice === '') {
      alert('사이즈와 컵을 선택해주세요');
      return;
    }
  };

  useEffect(() => {
    getProduct(id).then(res => {
      setdetailList(res.data.data);
    });
    getNutrition(id).then(res => {
      setNutritionInfo(res.data.data);
    });

    getCount().then(res => {
      setCartCount(res.data.data);
    });
  }, [id, open]);

  useEffect(() => {
    if (detailList && detailList.temperatureList.length !== 0) {
      console.log(temperatureChoice);
      console.log(detailList.temperatureList[0].temperatureId);
      getSize(detailList.temperatureList[0].temperatureId).then(res => {
        console.log('온도', res);
        setSizeOpt(res.data.data);
        setSelecteSizeTxt(res.data.data[0].size);
        setData({
          ...data,
          sizeId: res.data.data[0].sizeId,
        });
      });
    }
  }, [detailList]);

  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        setCategorySId={setCategorySId}
        cartCount={cartCount}
      />
      {temperatureChoice === 'ice' ? (
        <>
          <div className={cx('product-img')}>
            <img
              src={detailList && detailList.temperatureList[0].menuImg}
              alt=''
            />
          </div>
          <div className={cx('product-detail')}>
            <div className={cx('product-name')}>
              {detailList && detailList.temperatureList[0].menuName}
            </div>
            <div className={cx('product-english-name')}>
              {detailList && detailList.temperatureList[0].menuEngName}
            </div>
            <div className={cx('product-content')}>
              {detailList && detailList.temperatureList[0].description}
            </div>
            <div className={cx('product-price')}>
              {detailList && detailList.price}
            </div>

            <div className={cx('temp-button')}>
              {detailList && detailList.temperatureList.length < 2 ? (
                <div
                  className={
                    detailList &&
                    detailList.temperatureList[0].temperature === 'hot'
                      ? cx('only-hot')
                      : cx('only-ice')
                  }
                >
                  {detailList &&
                  detailList.temperatureList[0].temperature === 'hot' ? (
                    <div>HOT ONLY</div>
                  ) : (
                    <div>ICED ONLY</div>
                  )}
                </div>
              ) : (
                <>
                  <div
                    className={cx('hot-unclicked')}
                    onClick={() => handleTempChoice('hot')}
                    onKeyDown={() => handleTempChoice('hot')}
                  >
                    HOT
                  </div>
                  <div
                    className={cx('iced')}
                    onClick={() => handleTempChoice('ice')}
                    onKeyDown={() => handleTempChoice('ice')}
                  >
                    ICED
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx('product-img')}>
            <img
              src={detailList && detailList.temperatureList[1].menuImg}
              alt=''
            />
          </div>
          <div className={cx('product-detail')}>
            <div className={cx('product-name')}>
              {detailList && detailList.temperatureList[1].menuName}
            </div>
            <div className={cx('product-english-name')}>
              {detailList && detailList.temperatureList[1].menuEngName}
            </div>
            <div className={cx('product-content')}>
              {detailList && detailList.temperatureList[1].description}
            </div>
            <div className={cx('product-price')}>
              {detailList && detailList.price}
            </div>

            <div className={cx('temp-button')}>
              {detailList && detailList.temperatureList.length < 2 ? (
                <div
                  className={
                    detailList &&
                    detailList.temperatureList[1].temperature === 'hot'
                      ? cx('only-hot')
                      : cx('only-ice')
                  }
                >
                  {detailList &&
                  detailList.temperatureList[1].temperature === 'hot' ? (
                    <div>HOT ONLY</div>
                  ) : (
                    <div>ICED ONLY</div>
                  )}
                </div>
              ) : (
                <>
                  <div
                    className={cx('hot')}
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
        </>
      )}

      <hr className={cx('line')} />
      <div className={cx('product-nutrition')} onClick={handleNutritionOpen}>
        <p>제품영양정보</p>
        <Image src='/assets/svg/icon-more.svg' width={20} height={20} />
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
                        selecteSizeTxt={selecteSizeTxt}
                        setSelecteSizeTxt={setSelecteSizeTxt}
                        data={data}
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
                    <div className={cx('total-price')}>5,000원</div>
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
      {open ? undefined : <ToolbarList />}
      <BottomSheet open={nutritionOpen} onDismiss={onDismiss}>
        <SheetContent>
          <div className={cx('nutrition-sheet')}>
            <div className={cx('title')}>제품 영양 정보</div>
            <div>
              <ul className={cx('cupsize')}>
                <li onClick={() => handleNutritionSize('Tall')}>Tall</li>
                <li onClick={() => handleNutritionSize('Grande')}>Grande</li>
                <li onClick={() => handleNutritionSize('Venti')}>Venti</li>
              </ul>
              <div
                className={
                  nutritionSize === 'Tall'
                    ? cx('state-bar-tall')
                    : nutritionSize === 'Grande'
                    ? cx('state-bar-grande')
                    : cx('state-bar-venti')
                }
              />
              <ProductNurtitionInfo
                nutritionInfo={nutritionInfo}
                nutritionSize={nutritionSize}
              />
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
    </>
  );
}

export default productContent;
