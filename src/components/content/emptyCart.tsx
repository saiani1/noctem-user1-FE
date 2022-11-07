import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import styles from '../../../styles/content/emptyCart.module.scss';
import PopUp from '../ui/popUp';

interface IProps {
  title: string;
}

const cx = classNames.bind(styles);

function emptyCart(props: IProps) {
  const { title } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleToGo = () => {
    router.push('/category');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {open && <PopUp index={4} setOpen={setOpen} />}
      <div className={cx('cart-wrap')}>
        <h3>{title} 장바구니가 비어있습니다.</h3>
        <p>
          원하는 {title}들을 장바구니에 담고 <br />
          한번에 <span onClick={handleOpen}>주문</span>해 보세요.
        </p>
        <button type='button' onClick={handleToGo}>
          {title} 담으러 가기
        </button>
      </div>
    </>
  );
}

export default emptyCart;
