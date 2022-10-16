import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/main/main.module.scss';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

function myMenuCard({ item }: { item: any }) {
  const router = useRouter();
  return (
    <>
      <div className={cx('my-menu-true')}>
        <div>
          <div className={cx('my-menu-title')}>{item.alias}</div>
          <div className={cx('my-menu-kind')}>아이스 민트 블랜드 티</div>
          <div className={cx('my-menu-detail')}>
            ICED | TALL | 매장컵 | 에스프레소 샵1 | 물많이 | 얼음 적게 |
            일반휘핑 많이 | 초콜릿 드리즐
          </div>
        </div>
        <div>
          <div className={cx('img')}>img</div>
          <div
            className={cx('order-button')}
            onClick={() => {
              router.push('/order');
            }}
          >
            주문하기
          </div>
        </div>
      </div>
    </>
  );
}

export default myMenuCard;
