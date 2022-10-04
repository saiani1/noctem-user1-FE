/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/choicePaymentModal.module.scss';

interface IProp {
  setIsClickPaymentBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function choicePaymentModal(props: IProp) {
  const { setIsClickPaymentBtn } = props;
  const cx = classNames.bind(styles);

  const handleClickSubmitBtn = () => {
    setIsClickPaymentBtn(false);
  };

  return (
    <>
      <div className={cx('background')} />
      <div className={cx('wrap')}>
        <h2>결제 수단</h2>
        <div className={cx('input-wrap')}>
          <input type='radio' id='card' defaultChecked />
          <label htmlFor='card'>신용카드</label>
        </div>
        <div className={cx('card-info-wrap')}>
          <label htmlFor='cardnum'>신용카드 번호</label>
          <input
            type='number'
            maxLength={16}
            placeholder='ex) 0000 0000 0000 0000'
            id='cardnum'
          />
        </div>
        <button
          type='button'
          className={cx('submit-btn')}
          onClick={handleClickSubmitBtn}
        >
          선택하기
        </button>
      </div>
    </>
  );
}

export default choicePaymentModal;
