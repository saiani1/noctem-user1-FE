import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import useGeolocation from 'react-hook-geolocation';
import Image from 'next/image';
import RecommendedMenu from './recommendedMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userGradeState,
  nicknameState,
  loginState,
  tokenState,
} from '../store/atom/userStates';
import { getUserInfo, getUserLevel } from '../../src/store/api/user';
import { useRouter } from 'next/router';
import { getMyMenuData, getShowMainMyMenu } from '../../src/store/api/myMenu';
import { getPopularMenu } from '../store/api/popularMenu';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import MyMenuCard from './myMenuCard';
import Link from 'next/link';
import { getStoreList, getStoreWaitingTime } from '../../src/store/api/store';
import { IStore } from '../types/store';
import { IMenuData1 } from '../types/myMenu';
import { ILevel } from '../types/user';
import { IPopularMenuList } from '../types/popularMenu';
import styles from '../../styles/main/main.module.scss';
import { selectedStoreState } from '../store/atom/orderState';
import { confirmAlert } from 'react-confirm-alert';
import CustomAlert from '../components/customAlert';
import { toast } from 'react-hot-toast';
// import useEventSource from 'react-sse-hooks/dts/useEventSource';
// import useEventSourceListener from 'react-sse-hooks/dts/useEventSourceListener';
import { SSEProvider } from 'react-hooks-sse';
import Test from './test';

const cx = classNames.bind(styles);

function homeContent() {
  const router = useRouter();
  const geolocation = useGeolocation();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [isLoginTemp, setIsLoginTemp] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [myMenu, setMyMenu] = useState<IMenuData1[]>();
  const [showMyMenu, setShowMyMenu] = useState(false);
  const [userLevel, setUserLevel] = useState<ILevel>();
  const [progressState, setProgressState] = useRecoilState(userGradeState);
  const [, setSelectedStore] = useRecoilState(selectedStoreState);
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: `${progressState}%`,
    },
    maxContainer: {
      width: '100%',
    },
  };
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [store, setStore] = useState<IStore>();
  const [storeWaitingTime, setStoreWaitingTime] = useState<number>();
  const [popularMenuList, setPopularMenuList] = useState<IPopularMenuList[]>(
    [],
  );
  const [messages, setMessages] = useState<any>([]);
  // const chatSource = useEventSource({
  //   source: 'https://www.example.com/stream?token=blah',
  // });
  // const { startListening, stopListening } = useEventSourceListener({
  //   source: chatSource,
  //   startOnInit: true,
  //   event: {
  //     name: 'TEST',
  //     listener: ({ data }) => setMessages([...messages, data]),
  //   },
  // });

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

  useEffect(() => {
    setIsLoginTemp(isLogin);

    getPopularMenu().then(res => setPopularMenuList(res.data.data));

    if (isLogin) {
      setIsFetching(true);
      getUserInfo(token).then(res => {
        console.log('userInfo', res);
        setNickname(res.data.data.nickname);
      });
      getUserLevel(token).then(res => {
        console.log('userLevel', res.data.data);
        setUserLevel(res.data.data);
      });
      getShowMainMyMenu(token).then(res => {
        console.log('나만의메뉴 HOME에서 보기', res);
        if (res.data.data === true) {
          getMyMenuData(token).then(res => {
            setMyMenu(res.data.data);
            setShowMyMenu(true);
            console.log('나만의메뉴', res.data.data);
          });
        } else setShowMyMenu(false);
      });
    } else {
      setIsFetching(false);
      setNickname('게스트');
    }
  }, []);

  useEffect(() => {
    if (userLevel) {
      let exp =
        userLevel.userExp === 0
          ? 0
          : (userLevel.userExp / userLevel.requiredExpToNextGrade) * 100;
      setProgressState(exp);
    } else {
      setProgressState(0);
    }
  }, [userLevel]);

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

  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <div className={cx('point-box')}>
        <div className={cx('title')}>
          <span>{nickname}</span> 님, 반갑습니다.
        </div>
        {isFetching ? (
          <div className={cx('point-bar')}>
            <div className={cx('progress-bar-space')}>
              <div>
                {userLevel?.userGrade === 'Power Elixir'
                  ? userLevel.userExp
                  : userLevel &&
                    userLevel.requiredExpToNextGrade - userLevel.userExp}

                <Image
                  src='/assets/svg/icon-charge-battery.svg'
                  alt='charge-battery'
                  width={24}
                  height={21}
                />
                {userLevel?.userGrade === 'Power Elixir' ? (
                  <>Power Elixir</>
                ) : (
                  <>until {userLevel && userLevel.nextGrade} Level</>
                )}
              </div>
              <div className={cx('progress-bar-wrap')}>
                {userLevel?.userGrade === 'Power Elixir' ? (
                  <div
                    className={cx('progress-bar')}
                    role='progressbar'
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={styles.maxContainer}
                  />
                ) : (
                  <div
                    className={cx('progress-bar')}
                    role='progressbar'
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={styles.container}
                  />
                )}
              </div>
            </div>
            <div className={cx('my-score')}>
              <span className={cx('my-exp')}>
                {userLevel && userLevel.userExp}
              </span>
              /
              <span className={cx('req-exp')}>
                {userLevel && userLevel.nextGrade !== null
                  ? userLevel.requiredExpToNextGrade
                  : 'MAX'}
              </span>
              {userLevel?.userGrade === 'Potion' ? (
                <Image
                  src='/assets/svg/icon-potion-level.svg'
                  alt='potion-level'
                  width={24}
                  height={21}
                />
              ) : userLevel?.userGrade === 'Elixir' ? (
                <Image
                  src='/assets/svg/icon-elixir-level.svg'
                  alt='elixir-level'
                  width={24}
                  height={21}
                />
              ) : (
                <Image
                  src='/assets/svg/icon-power-elixir-level.svg'
                  alt='potion-level'
                  width={24}
                  height={21}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={cx('point-bar')}>
            <div className={cx('progress-bar-space')}>
              <div>
                0
                <Image
                  src='/assets/svg/icon-charge-battery.svg'
                  alt='charge-battery'
                  width={24}
                  height={21}
                />
                until Elixir Level
              </div>
              <div className={cx('progress-bar-wrap')}>
                <div
                  className={cx('progress-bar')}
                  role='progressbar'
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={styles.container}
                />
              </div>
            </div>
            <div className={cx('my-score')}>
              <span className={cx('my-exp')}>0</span>/
              <span className={cx('req-exp')}>20</span>
              <Image
                src='/assets/svg/icon-potion-level.svg'
                alt='potion-level'
                width={24}
                height={21}
              />
            </div>
          </div>
        )}
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
    </>
  );
}

export default homeContent;
