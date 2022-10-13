import { basicRequest } from './base';

const SERVICE = '/store-service';

export const getCloseStore = async () => {
  const res = await basicRequest.get(
    `${SERVICE}/store/search/35.165925854499974/129.1323358483565`,
  );
  return res;
};
