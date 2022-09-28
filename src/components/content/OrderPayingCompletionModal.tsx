import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import OrderProgressModal from './orderProgressModal';
import styles from '../../../styles/content/orderPayingCompletionModal.module.scss';

interface IProps {
  setIsClickSubmitBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function orderPayingCompletionModal(props: IProps) {
  const [isClickOrderProgressBtn, setIsClickOrderProgressBtn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { setIsClickSubmitBtn } = props;
  const cx = classNames.bind(styles);

  const handleClickMoreBtn = () => {
    setIsActive(prev => {
      return !prev;
    });
  };

  const handleCancelBtn = () => {
    setIsClickSubmitBtn(prev => {
      return !prev;
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsClickOrderProgressBtn(prev => {
      return !prev;
    });
  };

  return (
    <>
      {isClickOrderProgressBtn && (
        <OrderProgressModal
          setIsClickOrderProgressBtn={setIsClickOrderProgressBtn}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className={cx('background')} />
        <div className={cx('wrap')}>
          <h2>센텀드림월드점으로 주문하시겠어요?</h2>
          <div className={cx('img-wrap')}>
            <Image
              src='/assets/images/jpg/centomdreamworld.jpg'
              alt='store1'
              width={2016}
              height={1512}
              layout='responsive'
              className={cx('img')}
            />
          </div>
          <div className={cx('sub-tit-wrap')}>
            <div className={cx('tit-wrap')}>
              <h3>센텀드림월드</h3>
              <span>매장 내 직접 수령</span>
            </div>
            <div className={cx('tit-address-wrap')}>
              <p>부산광역시 해운대구 센텀2로25, 센텀드림월드 1층 (우동)</p>
              <button type='button' onClick={handleClickMoreBtn}>
                <Image
                  src='/assets/svg/icon-down-arrow.svg'
                  alt='down arrow'
                  width={30}
                  height={30}
                  className={cx(isActive ? 'active' : '')}
                />
              </button>
            </div>
          </div>
          {isActive && (
            <ul className={cx('order-info-wrap')}>
              <li>
                · 녹템 오더 이용 시, 주문을 완료한 후에는 일체의 주문 변경이
                불가합니다. 준비완료된 음료와 푸드는 1시간 동안 매장에서 보관 후
                폐기되면 재제공 및 환불은 불가합니다.(냉장/냉동보관 불가)
              </li>
              <li>
                · 매장에서 드시는 경우 플라스틱 일회용컵 제공이 불가능하오니
                다시한번 선택한 컵을 확인해 주시기 바랍니다.
              </li>
              <li>
                · 준비완료 1시간 이내라도 폐점 이후에는 제품의 제공이
                불가능합니다.
              </li>
            </ul>
          )}
          <div className={cx('tooltip-wrap')}>
            <p>
              결제와 함께 주문전송이 돼요!
              <br />
              주문을 다시 한번 확인해 주세요!
            </p>
          </div>
          <div className={cx('btn-wrap')}>
            <button
              type='button'
              className={cx('cancel-btn')}
              onClick={handleCancelBtn}
            >
              취소
            </button>
            <button type='submit' className={cx('submit-btn')}>
              결제 및 주문하기
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default orderPayingCompletionModal;
