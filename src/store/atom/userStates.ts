import { atom } from 'recoil';
import { IMenuData1 } from '../../types/myMenu';
import { ILevel, IUserInfo } from '../../types/user';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom<string>({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<IUserInfo>({
  key: 'userInfo',
  default: {
    email: '',
    name: '',
    sex: '',
    birthdayYear: '',
    birthdayMonth: '',
    birthdayDay: '',
    phoneNumber: null,
    nickname: '게스트',
  },
});

export const nicknameState = atom({
  key: 'nickname',
  default: '게스트',
});

export const myMenuState = atom<IMenuData1[]>({
  key: 'myMenu',
  default: [],
});

export const userLevelState = atom<ILevel>({
  key: 'userLevel',
  default: {
    userGrade: '',
    userExp: 0,
    nextGrade: '',
    requiredExpToNextGrade: 0,
  },
});

export const userGradeState = atom({
  key: 'userGrade',
  default: 0,
});

export const cartCntState = atom({
  key: 'cartCount',
  default: 0,
});
