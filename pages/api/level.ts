import { getToken } from '../../src/store/utils/token';
import { basicRequest } from './base';

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getUserLevel = async () => {
  const res = await basicRequest.get(`${SERVICE}/userAccount/grade`, HEADERS);
  return res;
};
