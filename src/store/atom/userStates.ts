import { atom } from 'recoil';

export const nicknameState = atom({
  key: 'nickname',
  default: 'User',
});

export const cartCnt = atom({
  key: 'cartCount',
  default: 0,
})