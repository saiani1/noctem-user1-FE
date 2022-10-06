import { basicRequest } from './base';

const SERVICE = '/menu-service';

export const getLageCategory = async () => {
  const res = await basicRequest.get(`${SERVICE}/categoryL`);
  return res;
};

export const getSmallCategory = async (categoryLId: number) => {
  const res = await basicRequest.get(`${SERVICE}/${categoryLId}/categoryS`);
  return res;
};

export const getMenuCategory = async (categorySId: number) => {
  const res = await basicRequest.get(`${SERVICE}/${categorySId}/menu`);
  return res;
};

export const getTemperature = async (menuId: number) => {
  const res = await basicRequest.get(`${SERVICE}/${menuId}/temperature`);
  return res;
};

export const getSize = async (temperatureId: number) => {
  const res = await basicRequest.get(`${SERVICE}/${temperatureId},size`);
  return res;
};
