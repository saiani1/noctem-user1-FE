import { atom } from 'recoil';
import { IMenuList, IOrderInfo, IPayment } from '../../types/order';
import { IStore } from './../../types/store.d';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
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

// 주문 정보
export const orderInfoState = atom<IOrderInfo>({
  key: 'orderInfoState',
  default: {
    storeId: 0,
    storeName: '',
    purchaseId: 0,
    orderNumber: '',
    turnNumber: 0,
    waitingTime: 0,
    state: '',
  },
  effects_UNSTABLE: [persistAtom],
});

// 진행 중인 주문 메뉴 리스트
export const orderProductDataState = atom<IMenuList[]>({
  key: 'orderProductDataState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
