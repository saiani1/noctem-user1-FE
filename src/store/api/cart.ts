<<<<<<< HEAD
import { getToken } from '../utils/token';
import { ICartData } from '../../types/productDetail';
=======
import { ICartData } from '../../types/productDetail';
import { getToken } from '../utils/token';
>>>>>>> 079d38251ff90995abab2bd434e5da24093875f8
import { basicRequest } from './base';

const USER_SERVICE = '/user-service';
const MENU_SERVICE = '/menu-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getCartList = async () => {
  const res = await basicRequest.get(`${USER_SERVICE}/carts`, HEADERS);
  return res;
};

export const getCartMenuData = async (sizeId: number, cartId: number) => {
  const res = await basicRequest.get(
    `${MENU_SERVICE}/size/menu/forCart/${sizeId}/${cartId}`,
  );
  return res;
};

export const getMyMenuData = async (sizeId: number, cartId: number) => {
  console.log(`${MENU_SERVICE}/size/menu/forMyMenu/${sizeId}/${cartId}`);
  const res = await basicRequest.get(
    `${MENU_SERVICE}/size/menu/forMyMenu/${sizeId}/${cartId}`,
  );
  return res;
};

export const getCount = async () => {
  const res = await basicRequest.get(`${USER_SERVICE}/carts/qty`, {
    headers: {
      Authorization: JSON.parse(getToken()),
    },
  });
  return res;
};

export const addCart = async (data: ICartData) => {
  const res = await basicRequest.post(`${USER_SERVICE}/carts`, data, HEADERS);
  return res;
};

export const changeItemCount = async (cartId: number, qty: number) => {
  const res = await basicRequest.patch(
    `${USER_SERVICE}/carts/${cartId}/quantities`,
    { qty: qty },
    HEADERS,
  );
  return res;
};

export const deleteItem = async (cartId: number) => {
  console.log(`${USER_SERVICE}/carts/${cartId}`);
  const res = await basicRequest.delete(
    `${USER_SERVICE}/carts/${cartId}`,
    HEADERS,
  );
  return res;
};

export const deleteAll = async () => {
  const res = await basicRequest.delete(`${USER_SERVICE}/carts/all`, HEADERS);
  return res;
};