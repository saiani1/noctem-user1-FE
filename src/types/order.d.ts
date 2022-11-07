export interface IProps {
  isClickPaymentBtn: boolean;
  isClickSubmitBtn: boolean;
  setIsClickPaymentBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickSubmitBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPurchaseData {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeContactNumber: string;
  userAge: number;
  userSex: string;
  purchaseTotalPrice: number;
  cardCorp: string;
  cardPaymentPrice: number;
  menuList: IMenuList[];
}

export interface IMenuList {
  sizeId: number;
  cartId: number;
  categorySmall: string;
  menuFullName: string;
  menuShortName: string;
  imgUrl: string;
  qty: number;
  menuTotalPrice: number;
  cupType: string | string[] | undefined;
  optionList?: [];
}

export interface IPayment {
  cardCorp: string;
  cardNumber: string;
  cardPaymentPrice: number;
}

// 주문 정보
export interface IOrderInfo {
  storeId: number;
  storeName: string;
  purchaseId: number;
  orderNumber: string;
  turnNumber: number;
  waitingTime: number;
  state: string;
}

export interface ICardInfo {
  company: string;
  card: string;
}

export interface ISSEData {
  message: string,
  alertCode: number,
  data: Data,
  dateTime: Date,
  errorCode: number | null,
}

export interface Data {
  userAccountId: number,
  purchaseId: number,
  orderStatus: string,
}