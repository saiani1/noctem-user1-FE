import React from 'react';
import classNames from 'classnames/bind';
import Router from 'next/router';

import styles from '../../../styles/content/orderCancelConfirmPopUp.module.scss';

interface IProps {
  setIsConfirmPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function orderCancelConfirmPopUp(props: IProps) {
  const { setIsConfirmPopUpActive } = props;
  const cx = classNames.bind(styles);

  const handleClickCancel = () => {
    setIsConfirmPopUpActive(prev => {
      return !prev;
    });
  };

  const handleClickSubmitCancel = () => {
    Router.push('/');
  };

  return (
    <>
      <div className={cx('background')} />
      <div className={cx('wrap')}>
        <h3 className={cx('tit')}>주문을 취소하시겠습니까?</h3>
        <div className={cx('btn-wrap')}>
          <button
            type='button'
            className={cx('cancel-btn')}
            onClick={handleClickCancel}
          >
            취소하기
          </button>
          <button
            type='submit'
            className={cx('submit-btn')}
            onClick={handleClickSubmitCancel}
          >
            주문 취소
          </button>
        </div>
      </div>
    </>
  );
}

export default orderCancelConfirmPopUp;
