import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/userMenu.module.scss';
import CustomAlert from '../customAlert';
import useGeolocation from 'react-hook-geolocation';
import MyMenuCard from './../myMenuCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getStoreList, getStoreWaitingTime } from '../../store/api/store';
import { selectedStoreState } from '../../store/atom/orderState';
import { loginState, tokenState } from '../../store/atom/userStates';
import { IStore } from '../../types/store';
import { getMyMenuData, getShowMainMyMenu } from '../../store/api/myMenu';
import { IMenuData1 } from '../../types/myMenu';
import { Carousel } from 'react-responsive-carousel';

const cx = classNames.bind(styles);

function userMenu() {
  const router = useRouter();
  const geolocation = useGeolocation();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [, setSelectedStore] = useRecoilState(selectedStoreState);
  const [isLoginTemp, setIsLoginTemp] = useState(false);
  const [store, setStore] = useState<IStore>();
  const [storeWaitingTime, setStoreWaitingTime] = useState<number>();
  const [myMenu, setMyMenu] = useState<IMenuData1[]>();
  const [showMyMenu, setShowMyMenu] = useState(false);

  const handleStoreSelect = () => {
    if (store !== undefined) {
      CustomAlert({
        title: '가까운 매장 선택',
        desc: '주문을 위한 매장을 선택하시겠습니까?',
        btnTitle: '매장 선택하기',
        id: 0,
        onAction: () => {
          setSelectedStore(store);
          router.push('/category');
          toast.success('매장이 선택되었습니다.');
        },
      });
    }
  };

  useEffect(() => {
    setIsLoginTemp(isLogin);

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

    if (isLogin) {
      getShowMainMyMenu(token).then(res => {
        if (res.data.data === true) {
          getMyMenuData(token).then(res => {
            setMyMenu(res.data.data);
            setShowMyMenu(true);
          });
        } else setShowMyMenu(false);
      });
    }
  }, [geolocation]);

  return (
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
  );
}

export default userMenu;
