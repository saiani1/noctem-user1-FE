import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';
import styles from '../../../../styles/pages/productPage.module.scss';
import CategoryContent from '../../categoryContent';
import ProductNutritionSheet from './productNutritionSheet';
import ProductOrder from './productOrder';
import ToolbarList from '../../ui/toolbarList';
import CustomAlert from '../../customAlert';
import { useRouter } from 'next/router';
import { addMyMenu } from '../../../../src/store/api/myMenu';
import {
  getSize,
  getNutrition,
  getProduct,
} from '../../../../src/store/api/category';
import { addCart, getCount } from '../../../../src/store/api/cart';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryLState } from '../../../store/atom/categoryState';
import {
  ICartData,
  ICartNonMemberData,
  IDetail,
  ISize,
  INutrition,
} from '../../../types/productDetail';
import { IParams } from '../../../types/myMenu';
import { cartCntState, tokenState } from '../../../store/atom/userStates';
import { addComma } from '../../../store/utils/function';
import { getSessionCartCount } from '../../../store/utils/cart';
import MyMenuRenamePopUp from '../myMenuRenamePopUp';
import { selectedStoreState } from '../../../store/atom/orderState';
import { loginState } from './../../../store/atom/userStates';
import { RightArrowBtn } from '../../../../public/assets/svg';

const cx = classNames.bind(styles);

function productContent() {
  const router = useRouter();
  const isSoldOut = router.query.isSoldOut;
  const id = router.query.id ? +router.query.id : 1;
  const myMenuNameRef = useRef<HTMLInputElement>(null);

  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [, setCategoryName] = useRecoilState(categoryLState);
  const [cartCount, setCartCount] = useRecoilState(cartCntState);

  const [open, setOpen] = useState(false);
  const [soldOutMenu, setSoldOutMenu] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [sizeOpt, setSizeOpt] = useState<ISize[]>();
  const [selectedSizeId, setSelectedSizeId] = useState(0);
  const [selectedSizeTxt, setSelectedSizeTxt] = useState('');
  const [cupChoice, setCupChoice] = useState('');
  const [count, setCount] = useState(1);
  const [detailList, setdetailList] = useState<IDetail>();
  const [selectedTempId, setSelectedTempId] = useState<number>(0);
  const [temperatureChoice, setTemperatureChoice] = useState(0);
  const [nutritionInfo, setNutritionInfo] = useState<INutrition>();
  const [myMenuAlert, setMyMenuAlert] = useState(false);
  const [myMenuData, setMyMenuData] = useState<IParams>({
    sizeId: 2,
    alias: '',
    cupType: '',
    personalOptionList: [],
  });
  const [cartData, setCartData] = useState<ICartData>({
    // ?????????, ??????, ??? ??????, ??????
    sizeId: 1,
    quantity: 1,
    cupType: '',
    personalOptionList: [],
  });

  function checkVaild() {
    if (cupChoice === '') {
      toast.error('?????? ???????????????.');
      return false;
    }

    const sum = cartCount + count;
    if (sum > 20) {
      toast.error('??? 20????????? ?????? ??? ????????????.');
      return false;
    }

    return true;
  }

  const onLogin = () => {
    router.push('/login');
  };

  const onSelectStore = () => {
    router.push(
      {
        pathname: '/selectStore',
        query: {
          sizeId: selectedSizeId,
          qty: count,
          cupType: cupChoice,
          optionList: [],
        },
      },
      '/selectStore',
    );
  };

  function onDismiss() {
    setOpen(false);
    setNutritionOpen(false);
  }

  const handleOptionOpen = () => {
    setOpen(true);
  };
  const handleNutritionOpen = () => {
    setNutritionOpen(true);
  };
  const handleClose = () => {
    setMyMenuAlert(!myMenuAlert);
  };

  const handleAddCart = () => {
    if (!checkVaild()) {
      return;
    }

    if (!isLogin) {
      // ??????, ??????, ??????, ??????, ??? ?????????, ??? ??????, ???, ??????
      sessionStorage.setItem(
        sessionStorage.length + '',
        JSON.stringify(cartData),
      );
      setCartCount(getSessionCartCount());
      setOpen(false);
      toast.success('??????????????? ???????????????!');
    } else {
      addCart(cartData, token).then(res => {
        if (res.data.data) {
          setOpen(false);
          toast.success('??????????????? ???????????????!');
        } else {
          toast.error(
            '??????????????? ?????? ??? ????????????. ?????? ??? ?????? ??????????????????.',
          );
        }
      });
    }
  };

  const handleOrder = () => {
    // ????????????
    if (!checkVaild()) {
      return;
    }

    if (selectedStore.distance === '') {
      setOpen(false);
      CustomAlert({
        title: '????????? ????????? ??????????????????.',
        desc: '????????? ???????????? ??? ??????????????????! ????????? ????????? ???????????? ??? ????????????.',
        btnTitle: '?????? ????????????',
        id: 0,
        onAction: () => {
          onSelectStore();
        },
      });
      return;
    }

    router.push(
      {
        pathname: '/order',
        query: {
          sizeId: selectedSizeId,
          qty: count,
          optionList: [],
          storeId: selectedStore.storeId,
          storeName: selectedStore.name,
          storeAddress: selectedStore.address,
          storeContactNumber: selectedStore.contactNumber,
          cupType: cupChoice,
        },
      },
      '/order',
    );
  };

  const handleTempChoice = (e: string, tempId: number) => {
    if (e === 'hot') setTemperatureChoice(1);
    else setTemperatureChoice(0);

    if (detailList && detailList.temperatureList.length === 1) {
      setSelectedTempId(detailList.temperatureList[0].temperatureId);
    } else {
      setSelectedTempId(tempId);
    }
  };

  const handleAddMyMenu = () => {
    if (!isLogin) {
      setOpen(false);
      CustomAlert({
        title: '?????????',
        desc: '???????????? ????????? ??????????????????. ????????? ???????????????????',
        btnTitle: '?????????',
        id: 0,
        onAction: () => {
          onLogin();
        },
      });
      return;
    }

    if (selectedSizeTxt === '' || cupChoice === '') {
      toast.error('???????????? ?????? ??????????????????');
      return;
    }

    setOpen(false);
    setMyMenuAlert(true);
  };

  const handleAddMyMenuData = () => {
    const mymenuNameValue = myMenuNameRef.current?.value;
    if (mymenuNameValue && mymenuNameValue.length !== 0) {
      setMyMenuData({
        ...myMenuData,
        alias: mymenuNameValue,
        sizeId: selectedSizeId,
        cupType: cupChoice,
      });
      const value = {
        sizeId: selectedSizeId,
        alias: mymenuNameValue,
        cupType: cupChoice,
        personalOptionList: myMenuData.personalOptionList,
      };
      addMyMenu(value, token).then(res => {
        if (res.data.data) {
          toast.success('????????? ????????? ?????????????????????');
          setMyMenuAlert(false);
        } else {
          toast.error('?????? ????????? ???????????????.');
          setMyMenuAlert(false);
        }
      });
    }
  };

  const getSizeFunc = (tempId: number) => {
    getSize(tempId).then(res => {
      setSizeOpt(res.data.data);
      setCartData({
        ...cartData,
        sizeId: res.data.data[0].sizeId,
      });
      if (selectedSizeId === 0 && selectedSizeTxt === '') {
        setSelectedSizeId(res.data.data[0].sizeId);
        setSelectedSizeTxt(res.data.data[0].size);
      } else {
        setSelectedSizeId(selectedSizeId);
        setSelectedSizeTxt(selectedSizeTxt);
      }
    });
  };

  useEffect(() => {
    setSoldOutMenu(false);
    if (isSoldOut === 'true' && selectedStore.storeId !== 0) {
      setSoldOutMenu(true);
    } else {
      setSoldOutMenu(false);
    }
  }, [soldOutMenu]);

  useEffect(() => {
    getProduct(id).then(res => {
      setdetailList(res.data.data);
    });
    getNutrition(id).then(res => {
      setNutritionInfo(res.data.data);
    });
    if (isLogin) {
      // ?????? ???????????? ??????
      getCount(token).then(res => {
        const resData = res.data.data === null ? 0 : res.data.data;
        setCartCount(resData);
      });
    } else {
      // ????????? ???????????? ??????
      setCartCount(getSessionCartCount());
    }
  }, [id, open]);

  useEffect(() => {
    if (detailList) {
      if (detailList.temperatureList.length === 1) {
        if (detailList.temperatureList[0].temperatureId < 66) {
          setSelectedTempId(detailList.temperatureList[0].temperatureId);
          getSizeFunc(detailList.temperatureList[0].temperatureId);
        }
      } else {
        let tempId = selectedTempId;
        if (tempId === 0) {
          tempId = detailList.temperatureList[0].temperatureId;
        }
        getSizeFunc(tempId);
      }
    }
  }, [detailList, temperatureChoice]);

  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        cartCount={cartCount}
      />
      {detailList && (
        <>
          <div className={cx('product-img')}>
            <img
              src={detailList.temperatureList[temperatureChoice].menuImg}
              alt=''
            />
          </div>
          <div className={cx('product-detail')}>
            <div className={cx('product-name')}>
              {detailList.temperatureList[temperatureChoice].menuName}
            </div>
            <div className={cx('product-english-name')}>
              {detailList.temperatureList[temperatureChoice].menuEngName}
            </div>
            <div className={cx('product-content')}>
              {detailList.temperatureList[temperatureChoice].description}
            </div>
            <div className={cx('product-price')}>
              {addComma(detailList.price)}???
            </div>
            {detailList.temperatureList[0].temperatureId < 66 ? (
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
                      className={cx(
                        temperatureChoice === 0 ? 'hot-unclicked' : 'hot',
                      )}
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
                      className={cx(
                        temperatureChoice === 0 ? 'iced' : 'iced-unclicked',
                      )}
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
            ) : undefined}
          </div>
        </>
      )}

      <hr className={cx('line')} />
      <div className={cx('product-nutrition')} onClick={handleNutritionOpen}>
        <p>??????????????????</p>
        <RightArrowBtn className={cx('icon')} />
      </div>
      {detailList && detailList.allergy === '??????' ? undefined : (
        <div className={cx('product-allergy')}>
          <p>???????????? ?????? ??????</p>
          <div>{detailList && detailList.allergy}</div>
        </div>
      )}
      <div className={cx('button-box')}>
        <button
          className={cx(
            'order-button',
            soldOutMenu ? 'disable' : '',
            detailList && detailList.temperatureList[0].temperatureId > 66
              ? 'disable'
              : '',
          )}
          type='button'
          onClick={handleOptionOpen}
          disabled={
            soldOutMenu ||
            (detailList && detailList.temperatureList[0].temperatureId > 66)
          }
        >
          {soldOutMenu ||
          (detailList && detailList.temperatureList[0].temperatureId > 66)
            ? '?????? ???????????? ???????????????.'
            : '????????????'}
        </button>
      </div>
      {myMenuAlert && (
        <MyMenuRenamePopUp
          prevPage='product'
          selectedSizeTxt={selectedSizeTxt}
          temperatureChoice={temperatureChoice}
          detailList={detailList}
          myMenuNameRef={myMenuNameRef}
          cupChoice={cupChoice}
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
        setSelectedSizeId={setSelectedSizeId}
      />
      {!open && <ToolbarList />}
      {nutritionInfo && (
        <ProductNutritionSheet
          nutritionOpen={nutritionOpen}
          onDismiss={onDismiss}
          nutritionInfo={nutritionInfo}
        />
      )}
    </>
  );
}

export default productContent;
