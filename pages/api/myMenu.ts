import { getToken } from '../../src/store/utils/token';
import { IParams } from '../../src/types/myMenu.d';
import { basicRequest } from './base';

const U_SERVICE = '/user-service';
const M_SERVICE = '/menu-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getMyMenu1 = async () => {
  const res = await basicRequest.get(`${U_SERVICE}/myMenu`, HEADERS);
  return res;
};

export const getMyMenu2 = async (sizeId: number, myMenuId: number) => {
  const res = await basicRequest.get(
    `${M_SERVICE}/size/menu/forMyMenu/${sizeId}/${myMenuId}`,
    HEADERS,
  );
  return res;
};

export const addMyMenu = async (value: IParams) => {
  const res = await basicRequest.post(`${U_SERVICE}/myMenu`, value, HEADERS);
  return res;
};

export const changeMyMenuOrder = async (value: number[]) => {
  const res = await basicRequest.patch(
    `${U_SERVICE}/myMenu/order`,
    {
      myMenuIdOrderList: value,
    },
    HEADERS,
  );
  return res;
};

export const changeMyMenuNickName = async (id: number, value: string) => {
  const res = await basicRequest.patch(
    `${U_SERVICE}/myMenu/${id}/alias`,
    {
      alias: value,
    },
    HEADERS,
  );
  return res;
};

export const deleteMyMenu = async (id: string) => {
  const res = await basicRequest.delete(`${U_SERVICE}/myMenu/${id}`, HEADERS);
  return res;
};

export const getShowMainMyMenu = async () => {
  const res = await basicRequest.get(
    `${U_SERVICE}/optionalInfo/orderHome`,
    HEADERS,
  );
  return res;
};

export const changeShowMainMyMenu = async () => {
  const res = await basicRequest.patch(
    `${U_SERVICE}/optionalInfo/orderHome`,
    {},
    HEADERS,
  );
  return res;
};
