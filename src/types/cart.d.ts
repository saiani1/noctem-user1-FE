export interface IParams {
  sizeId: number;
  quantity: number;
  personalOptionList?: IPersonalOption[];
}

interface IPersonalOption {
  optionId: number;
  amount: string;
}