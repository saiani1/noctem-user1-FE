export interface ICart {
  index: number;
  cartId: number;
  sizeId: number;
  qty: number;
  cupType: string;
  myPersonalOptionList?: IPersonalOptions;
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

export interface IMenuDataList {
  sizeId: number;
  qty: number;
  optionList?: [];
}

export interface ISelecetStoreProps {
  selectStore?: IStore;
  setSelectStore?: Dispatch<SetStateAction<boolean>>;
}

export interface ICartTotalPriceList {
  cartId: number;
  qty: number;
  amount: number;
}

export interface IQtyList {
  cartId: number;
  qty: number;
}

export interface IPriceList {
  cartId: number;
  amount: number;
}

export interface IDetailMenuInfo {
  menuId: number;
  cartId: number;
  menuName: string;
  menuEngName: string;
  menuImg: string;
  temperature: string;
  totalMenuPrice: number;
  size: string;
}
