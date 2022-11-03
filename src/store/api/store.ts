import { basicRequest } from './base';

const SERVICE = '/store-service';

export const getStoreList = async (latitude: number, longitude: number) => {
  const res = await basicRequest.get(
    `${SERVICE}/store/search/${latitude}/${longitude}`,
  );
  return res;
};

export const getStoreWaitingTime = async (storeId: number) => {
  const res = await basicRequest.get(`${SERVICE}/order/waitingTime/${storeId}`);
  return res;
};

export const getSoldOutMenu = async (storeId: number) => {
  const res = await basicRequest.get(`${SERVICE}/store/${storeId}/soldOut`);
  return res;
};
