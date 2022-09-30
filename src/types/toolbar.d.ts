export interface IProps {
  list: IList;
  active: IActive;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export interface IList {
  link: string;
  linkTxt: string;
  txt: string;
}

export interface IActive {
  Home: boolean;
  Category: boolean;
  Pay: boolean;
  MyPage: boolean;
  [key: string]: boolean;
}