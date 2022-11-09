import { ICartData } from '../../types/productDetail';
import { basicRequest } from './base';

const USER_SERVICE = '/user-service';
const MENU_SERVICE = '/menu-service';

export const getCartList = async (token: string) => {
  const res = await basicRequest.get(`${USER_SERVICE}/carts`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getCartMenuData = async (sizeId: number, cartId: number) => {
  const res = await basicRequest.get(
    `${MENU_SERVICE}/size/menu/forCart/${sizeId}/${cartId}`,
  );
  return res;
};

export const getMyMenuData = async (sizeId: number, cartId: number) => {
  const res = await basicRequest.get(
    `${MENU_SERVICE}/size/menu/forMyMenu/${sizeId}/${cartId}`,
  );
  return res;
};

export const getCount = async (token: string) => {
  const res = await basicRequest.get(`${USER_SERVICE}/carts/qty`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const addCart = async (data: ICartData, token: string) => {
  const res = await basicRequest.post(`${USER_SERVICE}/carts`, data, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const changeItemCount = async (cartId: number, qty: number, token: string) => {
  const res = await basicRequest.patch(
    `${USER_SERVICE}/carts/${cartId}/quantities`,
    { qty: qty },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

export const deleteItem = async (cartId: number, token: string) => {
  const res = await basicRequest.delete(
    `${USER_SERVICE}/carts/${cartId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

export const deleteCartAll = async (token: string) => {
  const res = await basicRequest.delete(`${USER_SERVICE}/carts/all`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
