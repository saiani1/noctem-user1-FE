import { atom } from 'recoil';
import { ICartTotalPriceList } from '../../types/cart';

export const nicknameState = atom({
  key: 'nickname',
  default: '게스트',
});

export const userGradeState = atom({
  key: 'userGrade',
  default: 0,
});

export const cartCnt = atom({
  key: 'cartCount',
  default: 0,
});

export const cartAmountList = atom<ICartTotalPriceList[]>({
  key: 'cartAmountList',
  default: [],
});
