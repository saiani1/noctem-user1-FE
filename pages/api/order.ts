import { getToken } from '../../src/store/utils/token';
import { IPurchaseData } from '../../src/types/order';
import { basicRequest } from './base';

const MENU_SERVICE = '/menu-service';
const ORDER_SERVICE = '/purchase-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken())
  }
};

export const getMenuDetail = async (sizeId: number, cartId: number) => {
  console.log(`${MENU_SERVICE}/size/menu/forPurchase/${sizeId}/${cartId}`);
  const res = await basicRequest.get(`${MENU_SERVICE}/size/menu/forPurchase/${sizeId}/${cartId}`);
  return res;
};

export const addOrder = async (data: IPurchaseData) => {
  console.log(`${ORDER_SERVICE}/purchase/user`);
  const res = await basicRequest.post(`${ORDER_SERVICE}/purchase/user`, data, HEADERS);
  return res;
};
