import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/myRewardTab.module.scss';

function myRewardTab() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('content-wrap')}>
      <div className={cx('level-wrap')}>
        <span className={cx('sub-tit')}>멤버십 등급</span>
        <div className={cx('level-tit-wrap')}>
          <span className={cx('level-icon-wrap')}>
            <Image
              src='/assets/svg/icon-potion-level.svg'
              width={16}
              height={20}
            />
          </span>
          <h3 className={cx('level-tit')}>Potion</h3>
        </div>
        <div className={cx('hp-info-wrap')}>
          <span className={cx('hp-info-content')}>
            <strong className={cx('current-hp')}>1</strong>/
            <span className={cx('max-hp')}>20</span>
          </span>
          <Image
            src='/assets/svg/icon-charge-battery.svg'
            width={8}
            height={16}
          />
        </div>
        <div className={cx('progress-bar-wrap')}>
          <div className={cx('progress-bar')} />
        </div>
      </div>
      <div className={cx('level-info-wrap')}>
        <p>다음 레벨까지 19개의 HP가 남았습니다.</p>
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
