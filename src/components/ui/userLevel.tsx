import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from '../../../styles/ui/userLevel.module.scss';
import { ILevel } from '../../types/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  loginState,
  nicknameState,
  tokenState,
  userGradeState,
} from '../../store/atom/userStates';
import { getUserInfo, getUserLevel } from '../../store/api/user';

const cx = classNames.bind(styles);

function userLevel() {
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [userLevel, setUserLevel] = useState<ILevel | null>(null);
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
    if (isLogin) {
      getUserInfo(token).then(res => {
        setNickname(res.data.data.nickname);
      });

      getUserLevel(token).then(res => {
        setUserLevel(res.data.data);
      });
    } else {
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

  return (
    <div className={cx('point-box')}>
      <div className={cx('title')}>
        <span>{nickname}</span> 님, 반갑습니다.
      </div>
      {userLevel !== null ? (
        <div className={cx('point-bar')}>
          <div className={cx('progress-bar-space')}>
            <div>
              {userLevel.userGrade === 'Power Elixir'
                ? userLevel.userExp
                : userLevel.requiredExpToNextGrade - userLevel.userExp}
              <Image
                src='/assets/svg/icon-charge-battery.svg'
                alt='charge-battery'
                width={24}
                height={21}
              />
              {userLevel.userGrade === 'Power Elixir' ? (
                <>Power Elixir</>
              ) : (
                <>until {userLevel && userLevel.nextGrade} Level</>
              )}
            </div>
            <div className={cx('progress-bar-wrap')}>
              <div
                className={cx('progress-bar')}
                role='progressbar'
                aria-valuemin={0}
                aria-valuemax={100}
                style={
                  userLevel.userGrade === 'Power Elixir'
                    ? styles.maxContainer
                    : styles.container
                }
              />
            </div>
          </div>
          <div className={cx('my-score')}>
            <span className={cx('my-exp')}>{userLevel.userExp}</span>/
            <span className={cx('req-exp')}>
              {userLevel.nextGrade !== null
                ? userLevel.requiredExpToNextGrade
                : 'MAX'}
            </span>
            {userLevel.userGrade === 'Potion' ? (
              <Image
                src='/assets/svg/icon-potion-level.svg'
                alt='potion-level'
                width={24}
                height={21}
              />
            ) : userLevel.userGrade === 'Elixir' ? (
              <Image
                src='/assets/svg/icon-power-elixir-level.svg'
                alt='elixir-level'
                width={24}
                height={21}
              />
            ) : (
              <Image
                src='/assets/svg/icon-elixir-level.svg'
                alt='elixir-level'
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
  );
}

export default userLevel;
