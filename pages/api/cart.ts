import { getToken } from '../../src/store/utils/token';
import { ICartData } from '../../src/types/productDetail';
import { basicRequest } from './base';

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken())
  }
}

export const addCart = async (data: ICartData) => {
  const res = await basicRequest.post(`${SERVICE}/carts`, data, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
};
