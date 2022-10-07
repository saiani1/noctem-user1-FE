export interface IDetail {
  index: number;
  temperatureId: number;
  menuId: number;
  menuName: string;
  menuEngName: string;
  description: string;
  menuImg: string;
  temperature: string;
  price: number;
}

export interface ICartData {
  sizeId: ISize['sizeId'];
  quantity: number;
  personalOptionList?: IPersonalOption[];
}

export interface ISize {
  index: number;
  sizeId: number;
  size: string;
  extraCost: number;
}

export interface ICup {
  id: number;
  name: string;
}

interface IPersonalOption {
  optionId: number;
  amount: string;
}

export interface ISizeProps {
  list: ISize;
  sizeChoice: string | undefined;
  setSizeChoice: Dispatch<SetStateAction<boolean>>;
  data: IData;
  setData: Dispatch<SetStateAction<boolean>>;
}