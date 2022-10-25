import { getToken } from '../utils/token';
import { basicRequest } from './base';

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getUserLevel = async () => {
  const res = await basicRequest.get(`${SERVICE}/userAccount/grade`, {
    headers: {
      Authorization: JSON.parse(getToken()),
    },
  });
  return res;
};
