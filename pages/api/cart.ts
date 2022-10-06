import { basicRequest } from './base';

const SERVICE = '/user-service';

export const addCart = async () => {
  const res = await basicRequest.post(`${SERVICE}/cart`);
  return res;
};
