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
import { addMyMenu } from '../../pages/api/myMenu';
import { ICartData, IDetail, ISize } from '../types/productDetail';
import { isExistToken } from './../store/utils/token';

const cx = classNames.bind(styles);

function productContent() {
  const router = useRouter();
  const id = router.query.id ? +router.query.id : 1;
  const [categoryName, setCategoryName] = useRecoilState(categoryLState);
  const [categorySId, setCategorySId] = useRecoilState(categorySIdState);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ICartData>({
    // 사이즈, 개수, 컵 종류, 온도
    sizeId: 1,
    quantity: 1,
    personalOptionList: [],
  });
  const [sizeOpt, setSizeOpt] = useState<ISize[]>();
  const [sizeChoice, setSizeChoice] = useState();
  const [cupChoice, setCupChoice] = useState('');
  const [count, setCount] = useState(1);
  const [detailList, setdetailList] = useState<IDetail[]>([]);
  const [temperatureChoice, setTemperatureChoice] = useState('ice');

  const handleOptionOpen = () => {
    setOpen(true);
  };

  const handleAddCart = () => {
    if (localStorage.getItem('token') === null) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
    } else {
      if (cupChoice === '') {
        alert('컵을 선택하세요.');
      } else {
        addCart(data).then(res => {
          console.log(res);
          if (res.data.data) {
            setOpen(false);
            alert('장바구니에 담겼습니다!');
          } else {
            alert('담기 실패');
          }
        });
      }
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
    setCount(prev => {
      return ++prev;
    });
    setData(prev => {
      return {
        ...prev,
        quantity: ++prev.quantity,
      };
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

  const handleAddMyMenu = (e: any) => {
    if (sizeChoice === '' || cupChoice === '') {
      alert('사이즈와 컵을 선택해주세요');
      return;
    }
    // const datas = {
    //   name: nameRef.current?.value || '',
    //   nickname: nicknameRef.current?.value || '',
    //   rrnFront: birthRef.current?.value || '',
    //   rrnBackFirst: genderRef.current?.value || '',
    //   email: emailRef.current?.value || '',
    //   password: passwordRef.current?.value || '',
    //   termsOfServiceAgreement: agreeData.agr1_use || false,
    //   personalInfoAgreement: agreeData.agr2_info || false,
    //   advertisementAgreement: agreeData.agr3_ad || false,
    // };

    // addUser(datas).then(res => {
    //   if (res.data.data) {
    //     setStep({
    //       step1: false,
    //       step2: false,
    //       step3: true,
    //     });
    //   }
    // });
  };

  useEffect(() => {
    getTemperature(id).then(res => {
      setdetailList(res.data.data);
    });
  }, [id]);

  useEffect(() => {
    if (detailList.length !== 0) {
      console.log(detailList);
      getSize(detailList[0].menuId).then(res => {
        console.log(res);
        if (res.data.data.length !== 0) {
          setSizeOpt(res.data.data);
          setSizeChoice(res.data.data[0].size);
          setData({
            ...data,
            sizeId: res.data.data[0].sizeId,
          });
        }
      });
    }
  }, [detailList]);

  return (
    <>
      <CategoryContent
        setCategoryName={setCategoryName}
        setCategorySId={setCategorySId}
      />
      {temperatureChoice === 'ice' ? (
        <>
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
            <img src={detailList[1] && detailList[1].menuImg} alt='' />
          </div>
          <div className={cx('product-detail')}>
            <div className={cx('product-name')}>
              {detailList[1] && detailList[1].menuName}
            </div>
            <div className={cx('product-english-name')}>
              {detailList[1] && detailList[1].menuEngName}
            </div>
            <div className={cx('product-content')}>
              {detailList[1] && detailList[1].description}
            </div>
            <div className={cx('product-price')}>
              {detailList[1] && detailList[1].price}
            </div>

            <div className={cx('temp-button')}>
              {detailList && detailList.length < 2 ? (
                <div
                  className={
                    detailList[1] && detailList[1].temperature === 'hot'
                      ? cx('only-hot')
                      : cx('only-ice')
                  }
                >
                  {detailList[1] && detailList[1].temperature === 'hot' ? (
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
                {detailList[0] && detailList[0].menuName}
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
                        sizeChoice={sizeChoice}
                        setSizeChoice={setSizeChoice}
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
    </>
  );
}

export default productContent;
