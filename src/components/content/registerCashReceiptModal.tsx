/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/registerCashReceiptModal.module.scss';

interface IProps {
  setIsClickCashReceiptBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function registerCashReceiptModal(props: IProps) {
  const { setIsClickCashReceiptBtn } = props;
  const [receiptType, setReceiptType] = useState('personal');
  const cx = classNames.bind(styles);

  const handleClickSubmitBtn = () => {
    setIsClickCashReceiptBtn(false);
  };

  const handleClickReceiptType = (e: any) => {
    if (e.target.id === 'personal') setReceiptType('personal');
    else if (e.target.id === 'business') setReceiptType('business');
  };
  return (
    <>
      <div className={cx('background')} />
      <div className={cx('wrap')}>
        <h2>현금영수증</h2>
        <ul className={cx('input-wrap')}>
          <li>
            <input
              type='radio'
              id='personal'
              name='receipt'
              onChange={handleClickReceiptType}
              defaultChecked
            />
            <label htmlFor='personal'>개인소득공제</label>
          </li>
          <li>
            <input
              type='radio'
              id='business'
              name='receipt'
              onChange={handleClickReceiptType}
            />
            <label htmlFor='business'>사업자증빙용</label>
          </li>
        </ul>
        <div className={cx('phone-num-wrap')}>
          <label htmlFor='phonenum'>
            {receiptType === 'personal' ? '휴대 전화 번호' : '사업자 번호'}
          </label>
          <input
            type='number'
            maxLength={16}
            placeholder='ex) 01012345678'
            id='phonenum'
          />
        </div>
        <button
          type='button'
          className={cx('btn')}
          onClick={handleClickSubmitBtn}
        >
          선택하기
        </button>
      </div>
    </>
  );
}

export default registerCashReceiptModal;
