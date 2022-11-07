import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from '../../styles/main/main.module.scss';
import { useRouter } from 'next/router';
import { getMyMenuData } from '../../src/store/api/cart';
import { IMenuData1, IMenuDetailData } from '../types/myMenu';
import { orderInfoState, selectedStoreState } from '../store/atom/orderState';
import { useRecoilValue } from 'recoil';
import { confirmAlert } from 'react-confirm-alert';
import CustomAlert from '../components/customAlert';
import toast from 'react-hot-toast';

const cx = classNames.bind(styles);

function myMenuCard({ item }: { item: IMenuData1 }) {
  const router = useRouter();
  const [myMenuInfo, setMyMenuInfo] = useState<IMenuDetailData>();
  const selectedStore = useRecoilValue(selectedStoreState);
  const orderInfo = useRecoilValue(orderInfoState);

  const handleOrder = () => {
    if (orderInfo.purchaseId !== 0) {
      toast('진행 중인 주문이 있습니다.', {
        icon: '📢',
      });
      return;
    }

    if (selectedStore.distance === '') {
      confirmAlert({
        customUI: ({ onClose }) => (
          <>
            <CustomAlert
              title='주문할 매장을 선택해주세요.'
              desc='매장을 선택하신 후 주문해주세요! 품절된 상품은 주문하실 수 없습니다.'
              btnTitle='매장 선택하기'
              // id={}
              onAction={onSelectStore}
              onClose={onClose}
            />
          </>
        ),
      });
    } else {
      router.push(
        {
          pathname: '/order',
          query: {
            sizeId: item.sizeId,
            qty: 1,
            cupType: item.cupType,
            optionList: [],
            storeId: selectedStore.storeId,
            storeName: selectedStore.name,
            storeAddress: selectedStore.address,
            storeContactNumber: selectedStore.contactNumber,
          },
        },
        '/order',
      );
    }
  };

  const onSelectStore = () => {
    router.push(
      {
        pathname: '/selectStore',
        query: {
          sizeId: item.sizeId,
          qty: 1,
          cupType: item.cupType,
          optionList: [],
        },
      },
      '/selectStore',
    );
  };

  useEffect(() => {
    getMyMenuData(item.sizeId, item.myMenuId).then(res => {
      const resData = res.data.data;
      const mymenuInfo = {
        ...resData,
        sizeId: item.sizeId,
      };
      setMyMenuInfo(mymenuInfo);
      console.log('마이메뉴카드', resData);
    });
  }, []);

  return (
    <>
      {myMenuInfo && (
        <div className={cx('my-menu-true')}>
          <div className={cx('my-menu-info-wrap')}>
            <div className={cx('my-menu-title')}>{item.alias}</div>
            <div className={cx('my-menu-kind')}>{myMenuInfo?.menuName}</div>
            <div className={cx('my-menu-detail')}>
              {myMenuInfo.temperature.toUpperCase()} | {myMenuInfo.size} |{' '}
              {item.cupType}
            </div>
          </div>
          <div className={cx('mymenu-order-wrap')}>
            <div className={cx('img')}>
              <img src={myMenuInfo.menuImg} />
            </div>
            <div className={cx('order-button')} onClick={handleOrder}>
              주문하기
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default myMenuCard;
