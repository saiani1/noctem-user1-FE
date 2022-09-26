export interface IProps {
  list: IList;
  active: boolean;
  onClick: (link: string, txt: string) => void;
}

export interface IList {
  link: string;
  txt: string;
}

export interface IActive {
  Home: boolean;
  Order: boolean;
  Pay: boolean;
  My: boolean;
  [key: string]: boolean;
}
