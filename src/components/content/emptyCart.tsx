import React, { useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/emptyCart.module.scss';

interface IProps {
  title: string;
}

function emptyCart(props: IProps) {
  const { title } = props;
  const cx = classNames.bind(styles);

  return (
    <div className={cx('cart-wrap')}>
      <h3>{title} 장바구니가 비어있습니다.</h3>
      <p>
        원하는 {title}들을 장바구니에 담고 <br />
        한번에 주문해 보세요.
      </p>
      <button type='button'>{title} 담으러 가기</button>
      <Image
        src='/assets/images/jpg/coffee-illust.jpg'
        width={235}
        height={280}
        layout='responsive'
      />
    </div>
  );
}

export default emptyCart;
