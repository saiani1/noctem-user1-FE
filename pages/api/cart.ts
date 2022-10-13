import { getToken } from '../../src/store/utils/token';
import { ICartData } from '../../src/types/productDetail';
import { basicRequest } from './base';

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken())
  }
}

export const getCart = async () => {
  const res = await basicRequest.get(`${SERVICE}/carts`, HEADERS);
  return res;
};

export const getCount = async () => {
  const res = await basicRequest.get(`${SERVICE}/carts/qty`, HEADERS);
  return res;
}

export const addCart = async (data: ICartData) => {
  const res = await basicRequest.post(`${SERVICE}/carts`, data, HEADERS);
  return res;
};

export const changeItemCount = async (cartId: number, qty: number) => {
  const res = await basicRequest.patch(`${SERVICE}/carts/${cartId}/quantities`, { qty: qty }, HEADERS);
  return res;
};

export const deleteItem = async (cartId: number) => {
  const res = await basicRequest.delete(`${SERVICE}/carts/${cartId}`, HEADERS);
  return res;
};
