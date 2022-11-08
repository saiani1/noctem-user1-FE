import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { useRecoilState, useRecoilValue } from 'recoil';

import styles from '../../../styles/content/myRewardTab.module.scss';
import {
  nicknameState,
  tokenState,
  userGradeState,
} from '../../store/atom/userStates';
import { loginState } from './../../store/atom/userStates';
import { getUserLevel } from '../../store/api/user';
import PreferChart from './preferChart';
import {
  ElixirLevelBtn,
  PotionLevelBtn,
  PowerElixirLevelBtn,
} from '../../../public/assets/svg';

const cx = classNames.bind(styles);
interface ILevel {
  userGrade: string;
  userExp: number;
  nextGrade: string;
  requiredExpToNextGrade: number;
}

function myRewardTab() {
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const nickname = useRecoilValue(nicknameState);
  const [progressState, setProgressState] = useRecoilState(userGradeState);
  const [userLevel, setUserLevel] = useState<ILevel>();
  const [theBestMenu, setTheBestMenu] = useState('');

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: `${progressState}%`,
    },
    maxContainer: {
      width: '100%',
    },
  };
  useEffect(() => {
    if (isLogin) {
      getUserLevel(token).then(res => {
        setUserLevel(res.data.data);
      });
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

  return (
    <div className={cx('content-wrap')}>
      <div className={cx('level-wrap')}>
        <span className={cx('sub-tit')}>멤버십 등급</span>
        <div className={cx('level-tit-wrap')}>
          <span className={cx('level-icon-wrap')}>
            {userLevel?.userGrade === 'Potion' ? (
              <PotionLevelBtn />
            ) : userLevel?.userGrade === 'Elixir' ? (
              <ElixirLevelBtn />
            ) : (
              <PowerElixirLevelBtn className={cx('power-elixir')} />
            )}
          </span>
          <h3
            className={
              userLevel?.userGrade === 'Potion'
                ? cx('level-tit', 'potion')
                : userLevel?.userGrade === 'Elixir'
                ? cx('level-tit', 'elixir')
                : cx('level-tit', 'power-elixir')
            }
          >
            {userLevel && userLevel.userGrade}
          </h3>
        </div>
        <div className={cx('hp-info-wrap')}>
          <span className={cx('hp-info-content')}>
            <strong className={cx('current-hp')}>
              {userLevel && userLevel.userExp}
            </strong>
            /
            <span className={cx('max-hp')}>
              {userLevel?.userGrade === 'Power Elixir' ? (
                <>MAX</>
              ) : (
                userLevel && userLevel.requiredExpToNextGrade
              )}
            </span>
          </span>
          <Image
            src='/assets/svg/icon-charge-battery.svg'
            width={8}
            height={16}
          />
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
      <div className={cx('level-info-wrap')}>
        {userLevel?.userGrade === 'Power Elixir' ? (
          <p>최종 레벨에 도달하였습니다.</p>
        ) : (
          <p>
            다음 레벨까지{' '}
            {userLevel && userLevel.requiredExpToNextGrade - userLevel.userExp}
            개의 HP가 남았습니다.
          </p>
        )}
      </div>
      <div className={cx('favorite-wrap')}>
        <span>
          <strong>{nickname}</strong>님의 취향파악
        </span>
        <h3>
          {theBestMenu === '카페인' && '" 커피 없인 못 살아 😍 "'}
          {theBestMenu === '디카페인' && '" 커피는 좋아하지만...😥 "'}
          {theBestMenu === '에이드' && '" 과즙미 뿜뿜 😊 "'}
          {theBestMenu === '스무디' && '" 설탕인간 🍬 "'}
          {theBestMenu === '티' && '" 힐링이 필요해 🍵 "'}
        </h3>
        <PreferChart setTheBestMenu={setTheBestMenu} />
      </div>
    </div>
  );
}

export default myRewardTab;
