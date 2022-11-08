import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'react-hot-toast';

import styles from '../../styles/main/main.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { loginState, tokenState } from '../store/atom/userStates';
import { getPopularMenu } from '../store/api/popularMenu';
import { IPopularMenuList } from '../types/popularMenu';
import {
  orderProductDataState,
  orderInfoState,
} from '../store/atom/orderState';
import OrderStateInfo from './ui/orderStateInfo';
import OrderProgressModal from './content/orderProgressModal';
import ToolbarList from './ui/toolbarList';
import RecommendedMenu from './recommendedMenu';
import { getWaitingInfo, patchOrderCancel } from '../store/api/order';
import UserLevel from './ui/userLevel';
import CustomAlert from './customAlert';
import UserMenu from './ui/userMenu';

const cx = classNames.bind(styles);

function homeContent() {
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [orderInfo, setOrderInfo] = useRecoilState(orderInfoState);
  const [orderProductData, setOrderProductData] = useRecoilState(
    orderProductDataState,
  );
  const [orderInfoTemp, setOrderInfoTemp] = useState({
    storeId: 0,
    storeName: '',
    purchaseId: 0,
    orderNumber: '',
    turnNumber: 0,
    waitingTime: 0,
    state: '',
  });
  const [orderProgressModal, setOrderProgressModal] = useState(false);
  const [popularMenuList, setPopularMenuList] = useState<IPopularMenuList[]>(
    [],
  );
  let ssEvents: EventSource | null = null;

  const onDismiss = () => {
    setOrderProgressModal(false);
  };

  const handleClose = () => {
    setOrderInfo({
      storeId: 0,
      storeName: '',
      purchaseId: 0,
      orderNumber: '',
      turnNumber: 0,
      waitingTime: 0,
      state: '',
    });
    setOrderProductData([]);
  };

  const handleOrderCancel = () => {
    onDismiss();
    CustomAlert({
      title: '주문 취소',
      desc: '주문을 취소하시겠습니까? 주문 확인 전까지 취소가 가능합니다.',
      btnTitle: '주문 취소하기',
      id: 0,
      onAction: () => {
        patchOrderCancel(token, orderInfo.purchaseId);
        handleClose();
        toast.success(`(${orderInfo.orderNumber}) 주문이 취소되었습니다.`);
      },
    });
  };

  useEffect(() => {
    setOrderInfoTemp({
      ...orderInfo,
    });
  }, [orderInfo]);

  useEffect(() => {
    getPopularMenu().then(res => setPopularMenuList(res.data.data));

    if (isLogin) {
      const STREAM_URL = `https://sse.noctem.click:33333/sse/alert-server/user/jwt/${
        token.split(' ')[1]
      }/${orderInfo.storeId}`;

      if (orderInfo.purchaseId !== 0 || ssEvents === null) {
        // getLastSSEMessage(token).then(res => {
        //   const data = res.data;

        //   getWaitingInfo(token).then(timeRes => {
        //     setOrderInfo({
        //       ...orderInfo,
        //       state: data.data.orderStatus,
        //       turnNumber: timeRes.data.data.turnNumber,
        //       waitingTime: timeRes.data.data.waitingTime,
        //     });
        //   });
        // });
        ssEvents = new EventSource(STREAM_URL, { withCredentials: true });
      }

      if (ssEvents !== null) {
        ssEvents.addEventListener('message', event => {
          const data = JSON.parse(event.data);

          if (data.alertCode === 3 || data.alertCode === 4) {
            console.log('제조중 OR 제조완료', data, data.data.orderStatus);
            getWaitingInfo(token).then(timeRes => {
              setOrderInfo({
                ...orderInfo,
                state: data.data.orderStatus,
                turnNumber: timeRes.data.data.turnNumber,
                waitingTime: timeRes.data.data.waitingTime,
              });
            });

            if (data.alertCode === 4 && ssEvents !== null) {
              ssEvents.close();
              return;
            }
          }

          if (data.alertCode === 5) {
            console.log('거절당함', data);
            setOrderInfo({
              ...orderInfo,
              state: '거절됨',
            });
            return;
          }

          if (data.alertCode === 6) {
            console.log('순서에 변화가 있을 경우', data);
            getWaitingInfo(token).then(res => {
              setOrderInfo({
                ...orderInfo,
                turnNumber: res.data.data.turnNumber,
                waitingTime: res.data.data.waitingTime,
              });
            });
          }

          if (
            (data.alertCode === 4 || data.alertCode === 5) &&
            ssEvents !== null
          ) {
            ssEvents.close();
          }
        });

        ssEvents.addEventListener('error', err => {
          console.log(err);
        });
      }
    }

    return () => {
      if (ssEvents !== null) {
        ssEvents.close();
      }
    };
  }, []);

  return (
    <>
      <div
        className={cx(
          'wrap',
          orderInfoTemp.purchaseId !== 0 && 'homeContent-wrap',
        )}
      >
        <UserLevel />
        <UserMenu />
        <div className={cx('recommend-menu')}>
          <h2 className={cx('title')}>추천 메뉴</h2>
          <ul className={cx('recommended')}>
            {popularMenuList.map(menu => (
              <RecommendedMenu key={menu.index} popularMenuList={menu} />
            ))}
          </ul>
        </div>
        {orderInfoTemp.purchaseId !== 0 && orderProductData.length !== 0 && (
          <OrderStateInfo
            setOrderProgressModal={setOrderProgressModal}
            orderInfoTemp={orderInfoTemp}
          />
        )}
      </div>

      {!orderProgressModal && <ToolbarList />}

      <OrderProgressModal
        onDismiss={onDismiss}
        isOpen={orderProgressModal}
        orderInfoTemp={orderInfoTemp}
        handleOrderCancel={handleOrderCancel}
        handleClose={handleClose}
      />
    </>
  );
}

export default homeContent;
