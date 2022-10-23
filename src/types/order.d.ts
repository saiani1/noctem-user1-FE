export interface IProps {
  isClickPaymentBtn: boolean;
  isClickCashReceiptBtn: boolean;
  isClickSubmitBtn: boolean;
  setIsClickPaymentBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickCashReceiptBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickSubmitBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPurchaseData {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeContactNumber: string;
  userAge: string;
  userSex: string;
  purchaseTotalPrice: number;
  cardCorp: string;
  cardPaymentPrice: number;
  menuList: IMenuList[];
}

export interface IMenuList {
  sizeId: number;
  menuFullName: string;
  menuShortName: string;
  imgUrl: string;
  qty: number;
  menuTotalPrice: number;
  optionList?: [];
}