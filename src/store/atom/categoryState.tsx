import { atom } from 'recoil';

export const categoryLState = atom({
  key: 'categoryLState',
  default: '',
});

export const categoryClickState = atom({
  key: 'categoryClickState',
  default: '',
});

export const categorySIdState = atom({
  key: 'categorySIdState',
  default: 0,
});
