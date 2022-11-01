export interface IParams {
  sizeId: number;
  alias: string;
  cupType: string;
  personalOptionList: IOption[];
}

export interface IOption {
  optionId: number;
  amount: string;
}

export interface IMenuData1 {
  index: number;
  myMenuId: number;
  alias: string;
  sizeId: number;
  cupType: string;
  myPersonalOptionList?: [];
}

export interface IMenuDetailData {
  myMenuId: string;
  menuName: string;
  menuImg: string;
  temperature: string;
  totalMenuPrice: number;
  size: string;
  sizeId: number;
}
