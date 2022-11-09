import { atom } from 'recoil';

export const categoryLState = atom({
  key: 'categoryLState',
  default: '추천',
});

export const categoryClickState = atom({
  key: 'categoryClickState',
  default: '2',
});

export const categorySIdState = atom({
  key: 'categorySIdState',
  default: 2,
});

export const categoryLNameState = atom({
  key: 'categoryLNameState',
  default: '음료',
});

export const categoryLIdState = atom({
  key: 'categoryLIdState',
  default: 1,
});
