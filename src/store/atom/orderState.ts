import { atom } from 'recoil';
import { IStore } from './../../types/store.d';

// 주문할 매장
export const selectedStoreState = atom<IStore>({
  key: 'selectedStoreState',
  default: {
    index: 0,
    storeId: 0,
    name: '',
    mainImg: '',
    address: '',
    businessOpenHours: '',
    businessCloseHours: '',
    isOpen: false,
    isParking: false,
    isEcoStore: false,
    isDriveThrough: false,
    distance: '',
    contactNumber: '',
  },
});


// 결제 수단
