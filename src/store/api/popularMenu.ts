import { basicRequest } from './base';

const P_SERVICE = '/purchase-service';
const M_SERVICE = '/menu-service';

export const getPopularMenu = async () => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/popularMenu`);
  return res;
};

export const getPopularMenuInfo = async (sizeId: number) => {
  const res = await basicRequest.get(
    `${M_SERVICE}/size/menu/forBest/${sizeId}`,
  );
  return res;
};

export const getPreferCategory = async (token: string) => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/preferredMenu`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};
