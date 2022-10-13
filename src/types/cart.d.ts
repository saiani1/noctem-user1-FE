export interface ICartList {
  index: number;
  cartId: number;
  sizeId: number;
  qty: number;
  myPersonalOptionList: IPersonalOptions;
}

export interface IData {
  sizeId: number;
  cartId: number;
  qty: number;
  menuName: string;
  menuEngName: string;
  menuImg: string;
  temperature: string;
  size: string;
  totalMenuPrice: number;
  myPersonalOptionList?: IPersonalOptions[];
}

export interface IPersonalOptions {
  myPersonalOptionId: number;
  amount: string;
}

export interface IMenuList {
  sizeId: number;
  qty: number;
  optionList?: [];
}

export interface ISelecetStoreProps {
  selectStore?: IStore;
  setSelectStore?: Dispatch<SetStateAction<boolean>>;
}