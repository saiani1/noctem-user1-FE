import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { isExistToken } from './../../store/utils/token';
import { getUserLevel } from '../../../src/store/api/level';
import styles from '../../../styles/content/myRewardTab.module.scss';
import { useRecoilState } from 'recoil';
import { userGradeState } from '../../store/atom/userStates';

const cx = classNames.bind(styles);
interface ILevel {
  userGrade: string;
  userExp: number;
  nextGrade: string;
  requiredExpToNextGrade: number;
}
function myRewardTab() {
  const [userLevel, setUserLevel] = useState<ILevel>();
  const [progressState, setProgressState] = useRecoilState(userGradeState);
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: `${progressState}%`,
    },
    maxContainer: {
      width: '100%',
    },
  };
  useEffect(() => {
    if (isExistToken()) {
      getUserLevel().then(res => {
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
        <p>
          다음 레벨까지{' '}
          {userLevel && userLevel.requiredExpToNextGrade - userLevel.userExp}
          개의 HP가 남았습니다.
        </p>
      </div>
      <div className={cx('favorite-wrap')}>
        <span>
          <strong>녹템</strong>님의 취향파악
        </span>
        <h3>" 카페인 중독 "</h3>
        <span className={cx('img-wrap')}>
          <Image
            src='/assets/images/png/favorite-graph.png'
            width={261}
            height={204}
          />
        </span>
      </div>
    </div>
  );
}

export default myRewardTab;
