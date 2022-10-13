import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../styles/main/main.module.scss';
import RecommendedMenu from './recommendedMenu';
import { useRecoilState } from 'recoil';
import { usernameState, userGradeState } from '../store/atom/userStates';
import { isExistToken } from './../store/utils/token';
import { getUserInfo } from './../../pages/api/user';
import { getUserLevel } from './../../pages/api/level';

const cx = classNames.bind(styles);
interface ILevel {
  userGrade: string;
  userExp: number;
  nextGrade: string;
  requiredExpToNextGrade: number;
}

function homeContent() {
  const [myMenu, SetMyMenu] = useState<boolean>(true);
  const [username, setUsername] = useRecoilState(usernameState);
  const [userLevel, setUserLevel] = useState<ILevel>();
  const [progressState, setProgressState] = useRecoilState(userGradeState);
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: `${progressState}%`,
    },
  };
  useEffect(() => {
    if (isExistToken()) {
      getUserInfo().then(res => {
        setUsername(res.data.data.nickname);
      });
      getUserLevel().then(res => {
        setUserLevel(res.data.data);
        console.log(userLevel);
      });
    } else {
      setUsername('User');
    }
  }, []);
  useEffect(() => {
    if (userLevel) {
      setProgressState(userLevel.requiredExpToNextGrade / userLevel.userExp);
    }
  }, [userLevel]);
  return (
    <>
      <div className={cx('point-box')}>
        <div className={cx('title')}>
          <span>{username}</span> 님, 반갑습니다.
        </div>
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
            <span>{userLevel && userLevel.userExp}</span>/
            {userLevel && userLevel.requiredExpToNextGrade}
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
      </div>
      <div className={cx('my-menu')}>
        <h2 className={cx('title')}>나만의 메뉴</h2>
        {myMenu ? (
          <div className={cx('my-menu-true')}>
            <div>
              <div className={cx('my-menu-title')}>
                나민의 아이스 민트 블랜드 티
              </div>
              <div className={cx('my-menu-kind')}>아이스 민트 블랜드 티</div>
              <div className={cx('my-menu-detail')}>
                ICED | TALL | 매장컵 | 에스프레소 샵1 | 물많이 | 얼음 적게 |
                일반휘핑 많이 | 초콜릿 드리즐
              </div>
            </div>
            <div>
              <div className={cx('img')}>img</div>
              <div className={cx('order-button')}>주문하기</div>
            </div>
          </div>
        ) : (
          <div className={cx('card')}>나만의 메뉴를 등록해 주세요</div>
        )}
      </div>
      <div className={cx('nearly-store')}>
        <h2 className={cx('title')}>가까운 매장</h2>
        <div className={cx('card')}>
          <div className={cx('store-img')}>img</div>
          <div className={cx('text-space')}>
            <div className={cx('store-name')}>센텀드림월드</div>
            <div className={cx('store-address')}>
              부산광역시 해운대구 셈텀2로25, 센텀드림월드 1층(우동)
            </div>
            <div>
              <div>
                예상대기시간<span>20</span>분
              </div>
              <div>151m</div>
            </div>
          </div>
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
