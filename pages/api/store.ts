import { getToken } from '../../src/store/utils/token';
import { basicRequest } from './base';

const SERVICE = '/store-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getStoreList = async (latitude: number, longitude: number) => {
  const res = await basicRequest.get(`${SERVICE}/store/search/${latitude}/${longitude}`, HEADERS);
  return res;
};
