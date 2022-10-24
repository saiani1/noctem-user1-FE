import { basicRequest } from './base';

const SERVICE = '/menu-service';

export const getMenuDetail = async (sizeId: number, cartId: number = 0) => {
  console.log(`${SERVICE}/size/menu/forPurchase/${sizeId}/${cartId}`);
  const res = await basicRequest.get(`${SERVICE}/size/menu/forPurchase/${sizeId}/${cartId}`);
  return res;
};
