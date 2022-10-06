import { atom } from 'recoil';

export const nicknameState = atom({
  key: 'nickname',
  default: 'User',
});