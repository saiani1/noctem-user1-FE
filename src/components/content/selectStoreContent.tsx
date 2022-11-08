import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import useGeolocation from 'react-hook-geolocation';
import { toast } from 'react-hot-toast';

import styles from '../../../styles/content/selectStoreContent.module.scss';
import StoreInfo from '../ui/storeInfo';
import ChoiceStoreModal from './choiceStoreModal';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import { getStoreList } from '../../../src/store/api/store';
import { IStore } from '../../../src/types/store.d';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selectedStoreState } from './../../store/atom/orderState';

const cx = classNames.bind(styles);
function shakeEventDidOccur() {
  //put your own code here etc.
  alert('shake!');
}
function selectStoreContent() {
  const geolocation = useGeolocation();
  const [open, setOpen] = useState(false);
  const [storeList, setStoreList] = useState<IStore[]>();
  const [clickStoreId, setClickStoreId] = useState(0);
  const [clickStoreInfo, setClickStoreInfo] = useState<IStore>();
  const [, setSelectedStore] = useRecoilState(selectedStoreState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  var Shake = require('shake.js');

  function onDismiss() {
    setOpen(false);
  }

  const handleNotService = () => {
    toast('준비 중인 서비스입니다!', {
      icon: '📢',
    });
  };

  const handleSelect = () => {
    if (clickStoreInfo !== undefined) {
      setSelectedStore({
        index: 0,
        storeId: clickStoreInfo.storeId,
        name: clickStoreInfo.name,
        mainImg: clickStoreInfo.mainImg,
        address: clickStoreInfo.address,
        businessOpenHours: clickStoreInfo.businessOpenHours,
        businessCloseHours: clickStoreInfo.businessCloseHours,
        isOpen: clickStoreInfo.isOpen,
        isParking: clickStoreInfo.isParking,
        isEcoStore: clickStoreInfo.isEcoStore,
        isDriveThrough: clickStoreInfo.isDriveThrough,
        distance: clickStoreInfo.distance,
        contactNumber: clickStoreInfo.contactNumber,
      });
      if (router.query.backPage !== undefined) {
        router.push(router.query.backPage + '');
      }
    }
  };

  const handleOrder = () => {
    if (clickStoreInfo !== undefined) {
      setSelectedStore({
        index: 0,
        storeId: clickStoreInfo.storeId,
        name: clickStoreInfo.name,
        mainImg: clickStoreInfo.mainImg,
        address: clickStoreInfo.address,
        businessOpenHours: clickStoreInfo.businessOpenHours,
        businessCloseHours: clickStoreInfo.businessCloseHours,
        isOpen: clickStoreInfo.isOpen,
        isParking: clickStoreInfo.isParking,
        isEcoStore: clickStoreInfo.isEcoStore,
        isDriveThrough: clickStoreInfo.isDriveThrough,
        distance: clickStoreInfo.distance,
        contactNumber: clickStoreInfo.contactNumber,
      });
      router.push(
        {
          pathname: '/order',
          query: {
            sizeId: router.query.sizeId,
            qty: router.query.qty,
            optionList: router.query.optionList,
            storeId: clickStoreInfo.storeId,
            storeName: clickStoreInfo.name,
            storeAddress: clickStoreInfo.address,
            storeContactNumber: clickStoreInfo.contactNumber,
            cupType: router.query.cupType,
          },
        },
        '/order',
      );
    }
  };

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      getStoreList(geolocation.latitude, geolocation.longitude).then(res => {
        setStoreList(res.data.data);
        setLoading(false);
      });
    } else {
      setLoading(true);
    }
  }, [geolocation]);

  useEffect(() => {
    if (storeList) {
      const clickStore = storeList.find(
        store => store.storeId === clickStoreId,
      );
      setClickStoreInfo(clickStore);
    }
  }, [clickStoreId]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div className={cx('wrap')}>
        <h1 className={cx('title')}>매장 설정</h1>
        <div className={cx('tab-wrap')}>
          <button type='button' className={cx('active')}>
            가까운 매장
          </button>
          <button type='button' onClick={handleNotService}>
            자주 가는 매장
          </button>
        </div>
        <ul>
          {storeList &&
            storeList.map((item: IStore) => (
              <StoreInfo
                key={item.index}
                setOpen={setOpen}
                data={item}
                setClickStoreId={setClickStoreId}
              />
            ))}
        </ul>
        {/* <StoreInfo setOpen={setOpen} />
        <StoreInfo setOpen={setOpen} />
        <StoreInfo setOpen={setOpen} /> */}
      </div>
      <BottomSheet open={open} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          {clickStoreInfo && (
            <ChoiceStoreModal
              clickStoreInfo={clickStoreInfo}
              handleSelect={handleSelect}
              handleOrder={handleOrder}
            />
          )}
        </SheetContent>
      </BottomSheet>
    </>
  );
}

export default selectStoreContent;
