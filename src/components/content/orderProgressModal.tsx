import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/orderProgressModal.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import { orderDataState } from '../../store/atom/orderState';
import { useRecoilValue } from 'recoil';

const cx = classNames.bind(styles);

function orderProgressModal({
  onDismiss,
  isOpen,
  orderInfoStatus,
}: // setOrderCancel
{
  onDismiss: () => void;
  isOpen: boolean;
  orderInfoStatus: string;
  // setOrderCancel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isCancelActive, setIsCancelActive] = useState(false);
  const orderData = useRecoilValue(orderDataState);

  const handleOrderCancel = () => {
    console.log('주문 취소');
  };

  useEffect(() => {
    console.log('orderData', orderData);
  }, []);

  return (
    <>
      <BottomSheet open={isOpen} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <div className={cx('wrap')}>
            <div className={cx('top-wrap')}>
              <div className={cx('tit-wrap')}>
                <span className={cx('store')}>센텀드림월드점에서</span>

                {orderInfoStatus === '주문확인중' && (
                  <>
                    <h2 className={cx('order-status')}>
                      주문을 확인하고 있습니다 🏃‍♀️
                    </h2>
                    <div className={cx('remain-time-wrap')}>
                      <p>
                        예상 대기시간 <strong>20</strong>분
                      </p>
                    </div>
                  </>
                )}
                {orderInfoStatus === '제조중' && (
                  <>
                    <h2 className={cx('order-status')}>
                      (A-04)님의 주문을 4번째 메뉴로 준비 중입니다. (A-04) 🏃‍♀️
                    </h2>
                    <div className={cx('remain-time-wrap')}>
                      <p>
                        남은 대기시간 <strong>20</strong>분
                      </p>
                    </div>
                  </>
                )}
                {orderInfoStatus === '제조완료' && (
                  <h2>(A-04)님, 메뉴가 모두 준비되었어요. 🤩</h2>
                )}

                <p className={cx('content')}>
                  주문 확인 전까지 취소가 가능합니다. 주문이 확인되면 메뉴
                  준비가 시작됩니다. 완성 후, 빠르게 픽업해 주세요.
                </p>
              </div>
              <div className={cx('progress-bar-wrap')}>
                <ul className={cx('content-wrap')}>
                  <li
                    className={cx(
                      orderInfoStatus === '주문확인중' ? 'active' : '',
                    )}
                  >
                    주문 확인 중
                  </li>
                  <li
                    className={cx(orderInfoStatus === '제조중' ? 'active' : '')}
                  >
                    준비 중
                  </li>
                  <li
                    className={cx(
                      orderInfoStatus === '제조완료' ? 'active' : '',
                    )}
                  >
                    준비 완료
                  </li>
                </ul>
                <div className={cx('bar-wrap')}>
                  <div className={cx('base-bar')} />
                  <div
                    className={cx(
                      'progress-bar',
                      orderInfoStatus === '제조중' ? 'prepare' : '',
                      orderInfoStatus === '제조완료' ? 'done' : '',
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={cx('bottom-wrap')}>
              <h3>주문 내역 (1)</h3>
              <div>
                <ul className={cx('menu-list-wrap')}>
                  <li className={cx('menu-list')}>
                    <span className={cx('img-wrap')}>
                      <Image
                        src='/assets/images/jpg/menu.jpg'
                        alt='menu'
                        width={70}
                        height={70}
                      />
                    </span>
                    <div className={cx('order-contents-wrap')}>
                      <p className={cx('order-tit')}>아이스 민트 블렌드 티</p>
                      <span className={cx('order-option')}>
                        ICED | Tall | 매장컵
                      </span>
                    </div>
                  </li>
                  <li className={cx('menu-list')}>
                    <span className={cx('img-wrap')}>
                      <Image
                        src='/assets/images/jpg/menu.jpg'
                        alt='menu'
                        width={70}
                        height={70}
                      />
                    </span>
                    <div className={cx('order-contents-wrap')}>
                      <p className={cx('order-tit')}>아이스 민트 블렌드 티</p>
                      <span className={cx('order-option')}>
                        ICED | Tall | 매장컵
                      </span>
                    </div>
                  </li>
                  <li className={cx('menu-list')}>
                    <span className={cx('img-wrap')}>
                      <Image
                        src='/assets/images/jpg/menu.jpg'
                        alt='menu'
                        width={70}
                        height={70}
                      />
                    </span>
                    <div className={cx('order-contents-wrap')}>
                      <p className={cx('order-tit')}>아이스 민트 블렌드 티</p>
                      <span className={cx('order-option')}>
                        ICED | Tall | 매장컵
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={cx('btn-wrap')}>
                <button
                  type='button'
                  disabled={!isCancelActive}
                  className={cx('btn', 'btn-cancel')}
                  onClick={handleOrderCancel}
                >
                  {isCancelActive ? '주문 취소' : '취소 불가'}
                </button>
                <button
                  type='button'
                  disabled={!isCancelActive}
                  className={cx('btn', 'btn-confirm')}
                  onClick={handleOrderCancel}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
    </>
  );
}

export default orderProgressModal;
