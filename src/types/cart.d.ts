export interface IData {
  index: number;
  sizeId: number;
  menuName: string;
  menuEngName: string;
  menuImg: string;
  temperature: string;
  size: string;
  totalMenuPrice: number;
  qty: number;
  myPersonalOptionList: IPersonalOptions[];
}

export interface IPersonalOptions {
  myPersonalOptionId: number;
  amount: string;
}

export interface IProps {
  data: IData
}