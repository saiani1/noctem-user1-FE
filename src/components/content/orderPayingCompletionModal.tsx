import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import OrderCancelConfirmPopUp from './orderCancelConfirmPopUp';
import styles from '../../../styles/content/orderPayingCompletionModal.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import { IStore } from '../../types/store';

function orderPayingCompletionModal({
  onDismiss,
  isOpen,
  selectedStore,
  handleSubmit,
}: {
  onDismiss: () => void;
  isOpen: boolean;
  selectedStore: IStore;
  handleSubmit: (e: { preventDefault: () => void }) => void;
}) {
  const [isClickOrderProgressBtn, setIsClickOrderProgressBtn] = useState(false);
  const [isConfirmPopUpActive, setIsConfirmPopUpActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cx = classNames.bind(styles);

  const handleClickMenuCancel = () => {
    setIsConfirmPopUpActive(prev => {
      return !prev;
    });
  };

  const handleClickMoreBtn = () => {
    setIsActive(prev => {
      return !prev;
    });
  };

  return (
    <>
      {!isClickOrderProgressBtn && (
        <BottomSheet open={isOpen} onDismiss={onDismiss}>
          <SheetContent>
            <div style={{ height: '85vh' }} />

            <div className={cx('wrap')}>
              <form onSubmit={handleSubmit}>
                <h2>{selectedStore.name}으로 주문하시겠어요?</h2>
                <div className={cx('img-wrap')}>
                  <Image
                    src={selectedStore.mainImg}
                    alt={selectedStore.name}
                    width={2016}
                    height={1512}
                    layout='responsive'
                    className={cx('img')}
                  />
                </div>
                <div className={cx('sub-tit-wrap')}>
                  <div className={cx('tit-wrap')}>
                    <h3>{selectedStore.name}</h3>
                    <span>매장 내 직접 수령</span>
                  </div>
                  <div className={cx('tit-address-wrap')}>
                    <p>{selectedStore.address}</p>
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
                      · 녹템 오더 이용 시, 주문을 완료한 후에는 일체의 주문
                      변경이 불가합니다. 준비완료된 음료와 푸드는 1시간 동안
                      매장에서 보관 후 폐기되면 재제공 및 환불은
                      불가합니다.(냉장/냉동보관 불가)
                    </li>
                    <li>
                      · 매장에서 드시는 경우 플라스틱 일회용컵 제공이
                      불가능하오니 다시한번 선택한 컵을 확인해 주시기 바랍니다.
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
                    onClick={onDismiss}
                  >
                    취소
                  </button>
                  <button type='submit' className={cx('submit-btn')}>
                    결제 및 주문하기
                  </button>
                </div>
              </form>
            </div>
          </SheetContent>
        </BottomSheet>
      )}
      {isConfirmPopUpActive && (
        <OrderCancelConfirmPopUp
          setIsConfirmPopUpActive={setIsConfirmPopUpActive}
        />
      )}
    </>
  );
}

export default orderPayingCompletionModal;
