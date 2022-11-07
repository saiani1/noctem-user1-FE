export interface IUserInfo {
  email: string;
  name: string;
  sex: string;
  birthdayYear: string;
  birthdayMonth: string;
  birthdayDay: string;
  phoneNumber: string | null;
  nickname: string;
}

export interface ILevel {
  userGrade: string;
  userExp: number;
  nextGrade: string;
  requiredExpToNextGrade: number;
}

export interface IUserDetailInfo {
  userAge: number;
  userSex: string;
}

export interface IPreferCatergory {
  id: string;
  label: string;
  value: number;
  color: string;
}
