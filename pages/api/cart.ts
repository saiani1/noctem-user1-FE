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

export const addCart = async (data: ICartData) => {
  const res = await basicRequest.post(`${SERVICE}/carts`, data, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
};

export const minusItem = async (sizeId: number, qty: number) => {
  const res = await basicRequest.patch(`${SERVICE}/carts/${sizeId}/quantities`, { qty: qty }, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
};

export const deleteItem = async (sizeId: number) => {
  const res = await basicRequest.delete(`${SERVICE}/carts/${sizeId}`, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
};
