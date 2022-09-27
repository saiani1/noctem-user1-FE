import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/main/main.module.scss';

const cx = classNames.bind(styles);

function recommendedMenu() {
  return (
    <div className={cx('recommended')}>
      <div className={cx('recommended-menu')}>
        <img
          src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
          alt=''
        />
        <div className={cx('recommended-menu-text')}>
          아이스 블랙 그레이즈드
        </div>
      </div>
      <div className={cx('recommended-menu')}>
        <img
          src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
          alt=''
        />
        <div className={cx('recommended-menu-text')}>돌체 콜드 브루</div>
      </div>
      <div className={cx('recommended-menu')}>
        <img
          src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
          alt=''
        />
        <div className={cx('recommended-menu-text')}>콜드 브루 몰트</div>
      </div>
      <div className={cx('recommended-menu')}>
        <img
          src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
          alt=''
        />
        <div className={cx('recommended-menu-text')}>아메리카노</div>
      </div>
      <div className={cx('recommended-menu')}>
        <img
          src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
          alt=''
        />
        <div className={cx('recommended-menu-text')}>호두 블랙티 라떼</div>
      </div>
    </div>
  );
}

export default recommendedMenu;
