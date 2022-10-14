export interface IParams {
  sizeId: number;
  alias: string;
  personalOptionList: IOption[];
}

export interface IOption {
  optionId: number;
  amount: string;
}

export interface IMenu1 {
  index: number;
  myMenuId: string;
  alias: string;
  sizeId: string;
  myPersonalOptionList: string[];
}

export interface IMenu2 {
  myMenuId: string;
  menuName: string;
  menuImg: string;
  temperature: string;
  totalMenuPrice: number;
  size: string;
}
