export interface IData {
  index: number;
  cartId: number;
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

export interface IStore {
  index: number;
  storeId: number;
  name: string;
  mainImg: string;
  address: string;
  businessOpenHours: string;
  businessCloseHours: string;
  isOpen: boolean;
  isParking: boolean;
  isEcoStore: boolean;
  isDriveThrough: boolean;
  distance: string;
}