import { getToken } from '../../src/store/utils/token';
import { IParams } from '../../src/types/cart';
import { basicRequest } from './base';

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken())
  }
}

export const addCart = async (data: IParams) => {
  const res = await basicRequest.post(`${SERVICE}/carts`, data, HEADERS);
  return res;
};
