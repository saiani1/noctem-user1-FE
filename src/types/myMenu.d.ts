export interface IParams {
  sizeId: number;
  alias: string;
  personalOptionList: IOption[];
}

export interface IOption {
  optionId: number;
  amount: string;
}

export interface IMenu {
  index: number;
  alias: string;
  menuImg: string;
  menuName: string;
  myMenuId: string;
  sizeId: string;
  size: string;
  temperature: string;
  totalMenuPrice: number;
}
