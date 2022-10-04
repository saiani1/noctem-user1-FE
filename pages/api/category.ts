import { basicRequest } from "./base";

const SERVICE = '/menu-service';

export const getLageCategory = async () => {
  const res = await basicRequest.get(`${SERVICE}/categoryL`);
  return res;
}

export const getSmallCategory = async (categoryLId: number) => {
  const res = await basicRequest.get(`${SERVICE}/${categoryLId}/categoryS`);
  return res;
}