import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import useGeolocation from 'react-hook-geolocation';
import Image from 'next/image';
import RecommendedMenu from './recommendedMenu';
import { useRecoilState } from 'recoil';
import { userGradeState, nicknameState } from '../store/atom/userStates';
import { isExistToken } from './../store/utils/token';
import { getUserInfo } from './../../pages/api/user';
import { getUserLevel } from './../../pages/api/level';
import { useRouter } from 'next/router';
import { getMyMenuData } from '../../pages/api/myMenu';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import MyMenuCard from './myMenuCard';
import Link from 'next/link';
import { getStoreList, getStoreWaitingTime } from '../../pages/api/store';
import { IStore } from '../types/store';
import { IMenuData1 } from '../types/myMenu';
import { ILevel } from '../types/user';
import styles from '../../styles/main/main.module.scss';

const cx = classNames.bind(styles);

function homeContent() {
  const router = useRouter();
  const geolocation = useGeolocation();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [myMenu, setMyMenu] = useState<IMenuData1[]>();
  const [userLevel, setUserLevel] = useState<ILevel>();
  const [progressState, setProgressState] = useRecoilState(userGradeState);
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: `${progressState}%`,
    },
  };
  const [nickname, setUsername] = useRecoilState(nicknameState);
  const [store, setStore] = useState<IStore>();
  const [storeWaitingTime, setStoreWaitingTime] = useState<number>();

  useEffect(() => {
    if (isExistToken()) {
      setIsLogin(true);
      getUserInfo().then(res => {
        setUsername(res.data.data.nickname);
      });
      getUserLevel().then(res => {
        setUserLevel(res.data.data);
      });
      getMyMenuData().then(res => {
        console.log(res);
        setMyMenu(res.data.data);
      });
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (userLevel) {
      let exp =
        userLevel.userExp === 0
          ? 0
          : userLevel.requiredExpToNextGrade / userLevel.userExp;
      setProgressState(exp);
    } else {
      setProgressState(0);
    }
  }, [userLevel]);

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      getStoreList(geolocation.latitude, geolocation.longitude).then(res => {
        setStore(res.data.data[0]);
        getStoreWaitingTime(res.data.data[0].storeId).then(resData => {
          setStoreWaitingTime(Math.round(resData.data.data.waitingTime / 60));
        });
      });
    }
  }, [geolocation]);

  return (
    <>
      <div className={cx('point-box')}>
        <div className={cx('title')}>
          <span>{nickname}</span> 님, 반갑습니다.
        </div>
        {isLogin ? (
          <div className={cx('point-bar')}>
            <div className={cx('progress-bar-space')}>
              <div>
                {userLevel &&
                  userLevel.requiredExpToNextGrade - userLevel.userExp}
                <Image
                  src='/assets/svg/icon-charge-battery.svg'
                  alt='charge-battery'
                  width={24}
                  height={21}
                />
                until {userLevel && userLevel.nextGrade} Level
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
              <span className={cx('my-exp')}>
                {userLevel && userLevel.userExp}
              </span>
              /
              <span className={cx('req-exp')}>
                {userLevel && userLevel.requiredExpToNextGrade}
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
        {isLogin ? (
          <div className={cx('my-menu')}>
            {myMenu && myMenu.length !== 0 ? (
              <>
                <h2 className={cx('title')}>나만의 메뉴</h2>
                <Carousel
                  showArrows={false}
                  showStatus={false}
                  showIndicators={false}
                  autoPlay={false}
                  verticalSwipe={'standard'}
                >
                  {myMenu.map(item => (
                    <MyMenuCard key={item.index} item={item} />
                  ))}
                </Carousel>
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
        ) : (
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
              <div className={cx('card')}>
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
        <RecommendedMenu />
      </div>
    </>
  );
}

export default homeContent;
