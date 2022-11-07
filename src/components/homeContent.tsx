import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import useGeolocation from 'react-hook-geolocation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import { confirmAlert } from 'react-confirm-alert';

import styles from '../../styles/main/main.module.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  nicknameState,
  loginState,
  tokenState,
} from '../store/atom/userStates';
import { getUserInfo } from '../store/api/user';
import { getMyMenuData, getShowMainMyMenu } from '../store/api/myMenu';
import { getPopularMenu } from '../store/api/popularMenu';
import { getStoreList, getStoreWaitingTime } from '../store/api/store';
import { IStore } from '../types/store';
import { IMenuData1 } from '../types/myMenu';
import { IPopularMenuList } from '../types/popularMenu';
import {
  orderProductDataState,
  orderInfoState,
  selectedStoreState,
} from '../store/atom/orderState';
import OrderStateInfo from './ui/orderStateInfo';
import OrderProgressModal from './content/orderProgressModal';
import ToolbarList from './ui/toolbarList';
import CustomAlert from '../components/customAlert';
import RecommendedMenu from './recommendedMenu';
import MyMenuCard from './myMenuCard';
import { getWaitingInfo } from '../store/api/order';
import { ISSEData } from '../types/order';
import UserLevel from './ui/userLevel';

const cx = classNames.bind(styles);

function shakeEventDidOccur() {
  alert('흔들림 감지');
}

function homeContent() {
  const router = useRouter();
  const geolocation = useGeolocation();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [orderInfo, setOrderInfo] = useRecoilState(orderInfoState);
  const [orderProductData, setOrderProductData] = useRecoilState(
    orderProductDataState,
  );
  const [isLoginTemp, setIsLoginTemp] = useState(false);
  const [orderInfoTemp, setOrderInfoTemp] = useState({
    storeId: 0,
    storeName: '',
    purchaseId: 0,
    orderNumber: '',
    turnNumber: 0,
    waitingTime: 0,
    state: '',
  });
  const [, setSelectedStore] = useRecoilState(selectedStoreState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [orderProgressModal, setOrderProgressModal] = useState(false);
  const [myMenu, setMyMenu] = useState<IMenuData1[]>();
  const [showMyMenu, setShowMyMenu] = useState(false);
  const [store, setStore] = useState<IStore>();
  const [storeWaitingTime, setStoreWaitingTime] = useState<number>();
  const [popularMenuList, setPopularMenuList] = useState<IPopularMenuList[]>(
    [],
  );
  const [SSEData, setSSEData] = useState<ISSEData | null>(null);
  let ssEvents: EventSource | null = null;

  const onDismiss = () => {
    setOrderProgressModal(false);
  };

  const handleStoreSelect = () => {
    if (store !== undefined) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <>
            <CustomAlert
              title='가까운 매장 선택'
              desc='주문을 위해 해당 매장을 선택하시겠습니까?'
              btnTitle='매장 선택하기'
              // id={}
              onAction={() => {
                setSelectedStore(store);
                router.push('/category');
                toast.success('매장이 선택되었습니다.');
              }}
              onClose={onClose}
            />
          </>
        ),
      });
    }
  };

  const handleClose = () => {
    setOrderInfo({
      storeId: 0,
      storeName: '',
      purchaseId: 0,
      orderNumber: '',
      turnNumber: 0,
      waitingTime: 0,
      state: '',
    });
    setOrderProductData([]);
    if (ssEvents !== null) {
      console.log('SSE 종료!!!');
      setSSEData(null);
      ssEvents.close();
    }
  };

  const handleOrderCancel = () => {
    console.log('주문 취소');
    // handleClose();
  };

  useEffect(() => {
    // console.log('orderInfo 변경!!!!!!!!!!!!!!!!!', orderInfo);
    setOrderInfoTemp({
      ...orderInfo,
    });
    setIsLoginTemp(isLogin);
  }, [orderInfo]);

  useEffect(() => {
    window.addEventListener('shake', shakeEventDidOccur, false);

    getPopularMenu().then(res => setPopularMenuList(res.data.data));

    if ('Notification' in window) {
      Notification.requestPermission(); // 알림 권한 요청
    }

    if (isLogin) {
      getUserInfo(token).then(res => {
        console.log('userInfo', res);
        setNickname(res.data.data.nickname);
      });
      getShowMainMyMenu(token).then(res => {
        if (res.data.data === true) {
          getMyMenuData(token).then(res => {
            setMyMenu(res.data.data);
            setShowMyMenu(true);
          });
        } else setShowMyMenu(false);
      });

      const STREAM_URL = `https://sse.noctem.click:33333/sse/alert-server/user/jwt/${
        token.split(' ')[1]
      }/${orderInfo.storeId}`;

      if (orderInfo.purchaseId !== 0) {
        ssEvents = new EventSource(STREAM_URL, { withCredentials: true });
      }

      if (ssEvents !== null) {
        ssEvents.addEventListener('open', event => {
          console.log('SSE OPEN!!!', event);
        });

        ssEvents.addEventListener('message', event => {
          console.log('데이터', event);
          const data = JSON.parse(event.data);

          setSSEData(data);
        });

        ssEvents.addEventListener('error', err => {
          console.log('ERR', err);
        });
      }
    } else {
      setNickname('게스트');
    }

    return () => {
      if (ssEvents !== null) {
        console.log('SSE 종료!!!');
        setSSEData(null);
        ssEvents.close();
      }
    };
  }, []);

  useEffect(() => {
    if (SSEData !== null) {
      if (SSEData.alertCode === 3 || SSEData.alertCode === 4) {
        // console.log('제조중 OR 제조완료', SSEData, SSEData.data.orderStatus);
        getWaitingInfo(token).then(res => {
          setOrderInfo({
            ...orderInfo,
            state: SSEData.data.orderStatus,
            turnNumber: res.data.data.turnNumber,
            waitingTime: res.data.data.waitingTime,
          });
        });
      }

      if (SSEData.alertCode === 5) {
        console.log('거절당함', SSEData);
        setOrderInfo({
          ...orderInfo,
          state: '거절됨',
        });
        return;
      }

      if (SSEData.alertCode === 6) {
        // console.log('순서에 변화가 있을 경우', SSEData);
        getWaitingInfo(token).then(res => {
          setOrderInfo({
            ...orderInfo,
            turnNumber: res.data.data.turnNumber,
            waitingTime: res.data.data.waitingTime,
          });
        });
      }
    }
  }, [SSEData]);

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      getStoreList(geolocation.latitude, geolocation.longitude).then(res => {
        const resData = res.data.data;
        const nearbyStore = resData.find((v: IStore) => v.isOpen);
        setStore(nearbyStore);
        getStoreWaitingTime(nearbyStore.storeId).then(resData => {
          setStoreWaitingTime(Math.round(resData.data.data.waitingTime / 60));
        });
      });
    }
  }, [geolocation]);

  return (
    <>
      <div
        className={cx(
          'wrap',
          orderInfoTemp.purchaseId !== 0 && 'homeContent-wrap',
        )}
      >
        <div className={cx('point-box')}>
          <div className={cx('title')}>
            <span>{nickname}</span> 님, 반갑습니다.
          </div>
          <UserLevel />
        </div>
        <div className={cx('my-wrap')}>
          {showMyMenu && isLoginTemp && (
            <div className={cx('my-menu')}>
              {myMenu && myMenu.length !== 0 ? (
                <>
                  <h2 className={cx('title')}>나만의 메뉴</h2>
                  {myMenu.length === 1 && (
                    <div className={cx('one-card')}>
                      <MyMenuCard key={myMenu[0].index} item={myMenu[0]} />
                    </div>
                  )}
                  {myMenu.length > 1 && (
                    <Carousel
                      showArrows={false}
                      showStatus={false}
                      showIndicators={false}
                      showThumbs={false}
                      autoPlay={false}
                      verticalSwipe={'standard'}
                    >
                      {myMenu.map(item => (
                        <MyMenuCard key={item.index} item={item} />
                      ))}
                    </Carousel>
                  )}
                </>
              ) : (
                <>
                  <h2 className={cx('title')}>나만의 메뉴</h2>
                  <div className={cx('card')}>
                    <div>나만의 메뉴를 등록해 주세요!</div>
                    <button
                      onClick={() => {
                        router.push('/category');
                      }}
                      className={cx('card-btn')}
                    >
                      찾으러 가기
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          {!isLoginTemp && (
            <div className={cx('info-wrap')}>
              <div className={cx('info')}>
                로그인 하여 모든 서비스를 이용해 보세요!
              </div>
              <div className={cx('btn-box')}>
                <button
                  className={cx('btn', 'signUp-btn')}
                  onClick={() => {
                    router.push('/signUp');
                  }}
                >
                  회원가입
                </button>
                <button
                  className={cx('btn', 'login-btn')}
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  <Link href='/login'>로그인</Link>
                </button>
              </div>
            </div>
          )}
          <div className={cx('nearly-store')}>
            {store && (
              <>
                <h2 className={cx('title')}>가까운 매장</h2>
                <div className={cx('card')} onClick={handleStoreSelect}>
                  <div className={cx('store-img')}>
                    <img src={store.mainImg} alt={store.name} />
                  </div>
                  <div className={cx('text-space')}>
                    <div className={cx('store-name')}>{store.name}</div>
                    <div className={cx('store-address')}>{store.address}</div>
                    <div className={cx('info')}>
                      <div>
                        예상대기시간
                        <span className={cx('waiting')}>
                          {storeWaitingTime && storeWaitingTime}
                        </span>
                        분
                      </div>
                      <span className={cx('distance')}>{store.distance}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={cx('recommend-menu')}>
          <h2 className={cx('title')}>추천 메뉴</h2>
          <ul className={cx('recommended')}>
            {popularMenuList.map(menu => (
              <RecommendedMenu key={menu.index} popularMenuList={menu} />
            ))}
          </ul>
        </div>
        {orderInfoTemp.purchaseId !== 0 && orderProductData.length !== 0 && (
          <OrderStateInfo
            setOrderProgressModal={setOrderProgressModal}
            orderInfoTemp={orderInfoTemp}
          />
        )}
      </div>

      {!orderProgressModal && <ToolbarList />}

      <OrderProgressModal
        onDismiss={onDismiss}
        isOpen={orderProgressModal}
        orderInfoTemp={orderInfoTemp}
        handleOrderCancel={handleOrderCancel}
        handleClose={handleClose}
      />
    </>
  );
}

export default homeContent;
