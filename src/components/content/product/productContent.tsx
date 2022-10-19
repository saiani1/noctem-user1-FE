import React, { useState, useEffect, FocusEvent, useRef } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from '../../../../styles/pages/productPage.module.scss';
import CategoryContent from '../../categoryContent';
import ProductNutritionSheet from './productNutritionSheet';
import ProductOrder from './productOrder';
import ToolbarList from '../../ui/toolbarList';
import CustomAlert from '../../customAlert';
import { useRouter } from 'next/router';
import { addMyMenu } from '../../../../pages/api/myMenu';
import {
  getSize,
  getNutrition,
  getProduct,
} from '../../../../pages/api/category';
import { addCart, getCount } from '../../../../pages/api/cart';
import { useRecoilState } from 'recoil';
import {
  categoryLState,
  categorySIdState,
} from '../../../store/atom/categoryState';
import {
  ICartData,
  ICartNonMemberData,
  IDetail,
  ISize,
  INutrition,
} from '../../../types/productDetail';
import { IParams } from '../../../types/myMenu';
import { cartCnt } from '../../../store/atom/userStates';
import { addComma, getSessionCartCount } from '../../../store/utils/function';
import MyMenuRenamePopUp from '../myMenuRenamePopUp';
import { selectedStoreState } from '../../../store/atom/orderState';
import { isExistToken } from './../../../store/utils/token';

const cx = classNames.bind(styles);

function productContent() {
  const router = useRouter();
  const id = router.query.id ? +router.query.id : 1;
  const [, setCategoryName] = useRecoilState(categoryLState);
  const [, setCategorySId] = useRecoilState(categorySIdState);
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [cartCount, setCartCount] = useRecoilState(cartCnt);
  const [open, setOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [sizeOpt, setSizeOpt] = useState<ISize[]>();
  const [selectedSizeId, setSelectedSizeId] = useState(0);
  const [selectedSizeTxt, setSelectedSizeTxt] = useState('');
  const [cupChoice, setCupChoice] = useState('');
  const [count, setCount] = useState(1);
  const [detailList, setdetailList] = useState<IDetail>();
  const [selectedTempId, setSelectedTempId] = useState<number>(0);
  const [temperatureChoice, setTemperatureChoice] = useState('ice');
  const [nutritionInfo, setNutritionInfo] = useState<INutrition>();
  const [nutritionSize, setNutritionSize] = useState('Tall');
  const [myMenuAlert, setMyMenuAlert] = useState(false);
  const [myMenuName, setMyMenuName] = useState('');
  const [myMenuData, setMyMenuData] = useState<IParams>({
    sizeId: 2,
    alias: '',
    personalOptionList: [],
  });
  const [cartData, setCartData] = useState<ICartData>({
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

  const handleOptionOpen = () => {
    setOpen(true);
  };
  const handleNutritionOpen = () => {
    setNutritionOpen(true);
  };
  const handleClose = () => {
    console.log('click');
    setMyMenuAlert(!myMenuAlert);
    console.log(myMenuAlert);
  };

  const handleAddCart = () => {
    if (cupChoice === '') {
      toast.error('컵을 선택하세요.');
    } else {
      const sum = cartCount + count;
      if (sum > 20) {
        toast.error('총 20개까지 담을 수 있습니다.');
        return;
      }

      console.log(cartData);
      if (!isExistToken()) {
        // 사진, 이름, 영문, 온도, 컵 사이즈, 컵 종류, 양, 가격
        sessionStorage.setItem(
          sessionStorage.length + '',
          JSON.stringify(cartData),
        );
        setCartCount(getSessionCartCount());
      } else {
        addCart(cartData);
      }
      setOpen(false);
      toast.success('장바구니에 담겼습니다!');
    }
  };
  const checkMenuName = (e: FocusEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMyMenuName(e.target.value);
  };
  const myMenuNameRef = useRef<HTMLInputElement>(null);

  const handleOrder = () => {
    console.log('주문하기');
    if (cupChoice === '') {
      toast.error('컵을 선택하세요.');
      return;
    }

    if (selectedStore.distance === '') {
      setOpen(false);
      confirmAlert({
        customUI: ({ onClose }) => (
          <>
            <CustomAlert
              title='주문할 매장을 선택해주세요.'
              desc='매장을 선택하신 후 주문해주세요! 품절된 상품은 주문하실 수 없습니다.'
              btnTitle='매장 선택하기'
              // id={}
              onAction={onSelectStore}
              onClose={onClose}
            />
          </>
        ),
      });
    } else {
      console.log('선택된 매장', selectedStore);
    }
  };

  const onSelectStore = () => {
    console.log('id', selectedSizeId);
    console.log('qty', count);
    router.push({
      pathname: '/selectStore',
      query: {
        sizeId: selectedSizeId,
        qty: count,
        optionList: [],
      },
    });
  };

  const handleTempChoice = (e: string, tempId: number) => {
    setTemperatureChoice(e);
    if (detailList && detailList.temperatureList.length === 1) {
      setSelectedTempId(detailList.temperatureList[0].temperatureId);
    } else {
      setSelectedTempId(tempId);
    }
  };

  function onDismiss() {
    setOpen(false);
    setNutritionOpen(false);
  }

  const handleAddMyMenu = (e: any) => {
    if (selectedSizeTxt === '' || cupChoice === '') {
      toast.error('사이즈와 컵을 선택해주세요');
      return;
    } else {
      setOpen(false);
      setMyMenuAlert(true);
    }
  };

  const handleAddMyMenuData = () => {
    const mymenuNameValue = myMenuNameRef.current?.value;
    console.log('myMenuName:', mymenuNameValue);
    if (mymenuNameValue && mymenuNameValue.length !== 0) {
      setMyMenuData({
        ...myMenuData,
        alias: mymenuNameValue,
        sizeId: selectedSizeId,
      });
      const value = {
        sizeId: selectedSizeId,
        alias: mymenuNameValue,
        personalOptionList: myMenuData.personalOptionList,
      };
      addMyMenu(value).then(res => {
        console.log(res);
        if (res.data.data) {
          toast.success('나만의 메뉴에 추가되었습니다');
          setMyMenuAlert(false);
        } else {
          toast.error('이미 등록된 상품입니다.');
          setMyMenuAlert(false);
        }
      });
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
    if (detailList) {
      if (detailList.temperatureList.length === 1) {
        setSelectedTempId(detailList.temperatureList[0].temperatureId);
        getSize(detailList.temperatureList[0].temperatureId).then(res => {
          setSizeOpt(res.data.data);
          setSelectedSizeId(res.data.data[0].sizeId);
          setSelectedSizeTxt(res.data.data[0].size);
          setCartData({
            ...cartData,
            sizeId: res.data.data[0].sizeId,
          });
        });
      } else {
        let tempId = selectedTempId;
        if (tempId === 0) {
          tempId = detailList.temperatureList[0].temperatureId;
        }
        getSize(tempId).then(res => {
          setSizeOpt(res.data.data);
          setSelectedSizeTxt(res.data.data[0].size);
          setSelectedSizeId(res.data.data[0].sizeId);
          setCartData({
            ...cartData,
            sizeId: res.data.data[0].sizeId,
          });
        });
      }
    }
  }, [detailList, temperatureChoice]);

  // useEffect(() => {
  //   console.log('selectedSizeId', selectedSizeId);
  //   console.log('count', count);
  //   console.log('price', detailList?.price);
  //   console.log('cup', cupChoice);
  // }, [selectedSizeId, count, detailList, cupChoice]);

  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        setCategorySId={setCategorySId}
        cartCount={cartCount}
      />
      {temperatureChoice === 'ice' ? (
        <>
          {detailList && (
            <>
              <div className={cx('product-img')}>
                <img src={detailList.temperatureList[0].menuImg} alt='' />
              </div>
              <div className={cx('product-detail')}>
                <div className={cx('product-name')}>
                  {detailList.temperatureList[0].menuName}
                </div>
                <div className={cx('product-english-name')}>
                  {detailList.temperatureList[0].menuEngName}
                </div>
                <div className={cx('product-content')}>
                  {detailList.temperatureList[0].description}
                </div>
                <div className={cx('product-price')}>
                  {addComma(detailList.price)}원
                </div>

                {
                  <div className={cx('temp-button')}>
                    {detailList.temperatureList.length === 1 ? (
                      <div
                        className={
                          detailList.temperatureList[0].temperature === 'hot'
                            ? cx('only-hot')
                            : cx('only-ice')
                        }
                      >
                        {detailList.temperatureList[0].temperature === 'hot' ? (
                          <div>HOT ONLY</div>
                        ) : (
                          <div>ICED ONLY</div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div
                          className={cx('hot-unclicked')}
                          onClick={() =>
                            handleTempChoice(
                              'hot',
                              detailList.temperatureList[1].temperatureId,
                            )
                          }
                          onKeyDown={() =>
                            handleTempChoice(
                              'hot',
                              detailList.temperatureList[1].temperatureId,
                            )
                          }
                        >
                          HOT
                        </div>
                        <div
                          className={cx('iced')}
                          onClick={() =>
                            handleTempChoice(
                              'ice',
                              detailList.temperatureList[0].temperatureId,
                            )
                          }
                          onKeyDown={() =>
                            handleTempChoice(
                              'ice',
                              detailList.temperatureList[0].temperatureId,
                            )
                          }
                        >
                          ICED
                        </div>
                      </>
                    )}
                  </div>
                }
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {detailList && (
            <>
              <div className={cx('product-img')}>
                <img src={detailList.temperatureList[1].menuImg} alt='' />
              </div>
              <div className={cx('product-detail')}>
                <div className={cx('product-name')}>
                  {detailList.temperatureList[1].menuName}
                </div>
                <div className={cx('product-english-name')}>
                  {detailList.temperatureList[1].menuEngName}
                </div>
                <div className={cx('product-content')}>
                  {detailList.temperatureList[1].description}
                </div>
                <div className={cx('product-price')}>
                  {addComma(detailList.price)}원
                </div>

                <div className={cx('temp-button')}>
                  {detailList.temperatureList.length < 2 ? (
                    <div
                      className={
                        detailList.temperatureList[1].temperature === 'hot'
                          ? cx('only-hot')
                          : cx('only-ice')
                      }
                    >
                      {detailList.temperatureList[1].temperature === 'hot' ? (
                        <div>HOT ONLY</div>
                      ) : (
                        <div>ICED ONLY</div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div
                        className={cx('hot')}
                        onClick={() =>
                          handleTempChoice(
                            'hot',
                            detailList.temperatureList[1].temperatureId,
                          )
                        }
                        onKeyDown={() =>
                          handleTempChoice(
                            'hot',
                            detailList.temperatureList[1].temperatureId,
                          )
                        }
                      >
                        HOT
                      </div>
                      <div
                        className={
                          temperatureChoice === 'ice'
                            ? cx('iced')
                            : cx('iced-unclicked')
                        }
                        onClick={() =>
                          handleTempChoice(
                            'ice',
                            detailList.temperatureList[0].temperatureId,
                          )
                        }
                        onKeyDown={() =>
                          handleTempChoice(
                            'ice',
                            detailList.temperatureList[0].temperatureId,
                          )
                        }
                      >
                        ICED
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      <hr className={cx('line')} />
      <div className={cx('product-nutrition')} onClick={handleNutritionOpen}>
        <p>제품영양정보</p>
        <Image src='/assets/svg/icon-more.svg' width={20} height={20} />
      </div>
      {detailList && detailList.allergy === '없음' ? undefined : (
        <div className={cx('product-allergy')}>
          <p>알레르기 유발 요인</p>
          <div>{detailList && detailList.allergy}</div>
        </div>
      )}
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
      {myMenuAlert && (
        <MyMenuRenamePopUp
          prevPage='product'
          selectedSizeTxt={selectedSizeTxt}
          temperatureChoice={temperatureChoice}
          detailList={detailList}
          myMenuNameRef={myMenuNameRef}
          handleClose={handleClose}
          handleAddMyMenuData={handleAddMyMenuData}
        />
      )}
      <ProductOrder
        open={open}
        onDismiss={onDismiss}
        detailList={detailList}
        sizeOpt={sizeOpt}
        setCupChoice={setCupChoice}
        cupChoice={cupChoice}
        setCartData={setCartData}
        handleAddMyMenu={handleAddMyMenu}
        handleAddCart={handleAddCart}
        handleOrder={handleOrder}
        count={count}
        setCount={setCount}
        selectedSizeTxt={selectedSizeTxt}
        setSelectedSizeTxt={setSelectedSizeTxt}
        cartData={cartData}
      />
      {!open && <ToolbarList />}
      <ProductNutritionSheet
        nutritionOpen={nutritionOpen}
        onDismiss={onDismiss}
        nutritionInfo={nutritionInfo}
      />
    </>
  );
}

export default productContent;
