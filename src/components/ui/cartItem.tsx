import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from '../../../styles/ui/cartItem.module.scss';
import { IData } from '../../types/cart';
import { changeItemCount, deleteItem } from '../../../pages/api/cart';
import { addComma } from '../../store/utils/function';

const cx = classNames.bind(styles);

function cartItem({
  data,
  count,
  isChange,
  setIsChange,
}: {
  data: IData;
  count: number;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    // index,
    cartId,
    // sizeId,
    menuName,
    menuEngName,
    menuImg,
    temperature,
    size,
    totalMenuPrice,
    qty,
    myPersonalOptionList,
  } = data;

  const handleCountChange = (type: string, id: number, qty: number) => {
    let isSuccess = false;

    if (type === 'add') {
      if (count < 20) {
        qty++;
        isSuccess = true;
      }
    } else {
      if (qty > 1) {
        qty--;
        isSuccess = true;
      }
    }

    if (isSuccess) {
      changeItemCount(id, qty).then(res => {
        if (res.data.data) {
          setIsChange(!isChange);
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteItem(id).then(res => {
      console.log(res);
      setIsChange(!isChange);
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
            handleDelete(cartId);
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
            >{`${temperature} | ${size} | 매장 컵`}</span>
            <span className={cx('price')}>{addComma(totalMenuPrice)}원</span>
          </div>
          {/* <button type='button' className={cx('option-change-btn')}>
            옵션변경
          </button> */}
          <div className={cx('num-change-wrap')}>
            <div className={cx('left')}>
              <div
                className={cx('icon-btn')}
                onClick={() => {
                  handleCountChange('sub', cartId, qty);
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
              <div
                className={cx('icon-btn')}
                onClick={() => {
                  handleCountChange('add', cartId, qty);
                }}
              >
                <Image
                  src='/assets/svg/icon-plus-active.svg'
                  alt='plus icon'
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <span>{addComma(totalMenuPrice * qty)}원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cartItem;
