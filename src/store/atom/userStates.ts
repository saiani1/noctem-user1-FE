import { atom } from 'recoil';

export const nicknameState = atom({
  key: 'nickname',
  default: 'User',
});

export const userGradeState = atom({
  key: 'userGrade',
  default: 0,
});

export const cartCnt = atom({
  key: 'cartCount',
  default: 0,
});

export const cartTotalAmount = atom({
  key: 'cartTotalAmount',
  default: 0,
});
