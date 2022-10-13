import { atom } from 'recoil';

export const usernameState = atom({
  key: 'username',
  default: 'User',
});

export const userGradeState = atom({
  key: 'userGrade',
  default: 0,
});
