export interface IParams {
  sizeId: number;
  alias: string;
  personalOptionList: IOption;
}

export interface IOption {
  optionId: number;
  amount: string;
}

interface IMenu {
  index: number;
  alias: string;
  menuImg: string;
  menuName: string;
  size: string;
  temperature: string;
  totalPrice: number;
  handleDeleteMenu: React.MouseEventHandler<HTMLButtonElement>;
}
