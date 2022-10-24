import { atom } from 'recoil';
import { IOrderInfo, IPayment } from '../../types/order';
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
export const paymentState = atom<IPayment>({
  key: 'paymentState',
  default: {
    cardCorp: '',
    cardNumber: '',
    cardPaymentPrice: 0,
  }
})

// 결제 정보
export const orderInfoState = atom<IOrderInfo>({
  key: 'orderInfoState',
  default: {
    storeId: 0,
    purchaseId: 0,
  }
})
