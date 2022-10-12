import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from '../../../styles/ui/cartItem.module.scss';
import { IProps } from '../../types/cart';
import { deleteItem } from '../../../pages/api/cart';

const cx = classNames.bind(styles);

function cartItem({
  data,
  handleMinus,
  // handleDelete,
  isDelete,
  setIsDelete,
}: {
  data: IProps['data'];
  handleMinus: (id: number, qty: number) => void;
  // handleDelete: (id: number) => void;
  isDelete: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    // index,
    menuEngName,
    menuImg,
    menuName,
    myPersonalOptionList,
    qty,
    size,
    sizeId,
    temperature,
    totalMenuPrice,
  } = data;

  const handlePlus = () => {};

  const handleDelete = (id: number) => {
    deleteItem(id).then(res => {
      console.log(res);
      setIsDelete(!isDelete);
    });
  };

  return (
    <div className={cx('cart-item-wrap')}>
      <div className={cx('first-wrap')}>
        <input type='checkbox' />
        <button
          type='button'
          className={cx('close-btn')}
          onClick={() => {
            handleDelete(sizeId);
          }}
        >
          <Image src='/assets/svg/icon-x-mark.svg' width={8} height={8} />
        </button>
      </div>
      <div className={cx('second-wrap')}>
        <span className={cx('img-wrap')}>
          <img src={menuImg} width={100} height={100} />
        </span>
        <div className={cx('content-wrap')}>
          <h4 className={cx('kor-name')}>{menuName}</h4>
          <span className={cx('eng-name')}>{menuEngName}</span>
          <div className={cx('option-wrap')}>
            <span
              className={cx('option')}
            >{`${temperature} | ${size} | ${myPersonalOptionList}`}</span>
            <span className={cx('price')}>{totalMenuPrice}원</span>
          </div>
          {/* <button type='button' className={cx('option-change-btn')}>
            옵션변경
          </button> */}
          <div className={cx('num-change-wrap')}>
            <div className={cx('left')}>
              <div
                className={cx('icon-btn')}
                onClick={() => {
                  handleMinus(sizeId, qty);
                }}
              >
                <Image
                  src={
                    qty > 1
                      ? '/assets/svg/icon-minus-active.svg'
                      : '/assets/svg/icon-minus.svg'
                  }
                  alt='minus icon'
                  width={20}
                  height={20}
                />
              </div>
              <strong>{qty}</strong>
              <div className={cx('icon-btn')} onClick={handlePlus}>
                <Image
                  src='/assets/svg/icon-plus.svg'
                  alt='plus icon'
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <span>{totalMenuPrice * qty}원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cartItem;
