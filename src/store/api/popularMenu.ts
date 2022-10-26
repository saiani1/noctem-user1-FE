import { basicRequest } from './base';

const SERVICE = '/purchase-service';

export const getPopularMenu = async () => {
  const res = await basicRequest.get(`${SERVICE}/statistics/popularMenu`);
  return res;
};
