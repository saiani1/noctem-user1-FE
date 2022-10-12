import { getToken } from '../../src/store/utils/token';
import { IParams } from '../../src/types/myMenu.d';
import { basicRequest } from './base';

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getMyMenu = async () => {
  const res = await basicRequest.get(`${SERVICE}/myMenu`, {
    headers: {
      Authorization: JSON.parse(getToken()),
    },
  });
  return res;
};

export const addMyMenu = async (value: IParams) => {
  const res = await basicRequest.post(`${SERVICE}/myMenu`, value, {
    headers: {
      Authorization: JSON.parse(getToken()),
    },
  });
  return res;
};

export const changeMyMenuOrder = async (value: number[]) => {
  const res = await basicRequest.patch(
    `${SERVICE}/myMenu/order`,
    {
      myMenuIdOrderList: value,
    },
    {
      headers: {
        Authorization: JSON.parse(getToken()),
      },
    },
  );
  return res;
};

export const changeMyMenuNickName = async (id: number, value: string) => {
  const res = await basicRequest.patch(
    `${SERVICE}/myMenu/${id}/alias`,
    {
      alias: value,
    },
    {
      headers: {
        Authorization: JSON.parse(getToken()),
      },
    },
  );
  return res;
};

export const deleteMyMenu = async (id: string) => {
  const res = await basicRequest.delete(`${SERVICE}/myMenu/${id}`, {
    headers: {
      Authorization: JSON.parse(getToken()),
    },
  });
  return res;
};

export const getShowMainMyMenu = async () => {
  const res = await basicRequest.get(`${SERVICE}/optionalInfo/orderHome`, {
    headers: {
      Authorization: JSON.parse(getToken()),
    },
  });
  return res;
};

export const changeShowMainMyMenu = async () => {
  const res = await basicRequest.patch(
    `${SERVICE}/optionalInfo/orderHome`,
    {},
    {
      headers: {
        Authorization: JSON.parse(getToken()),
      },
    },
  );
  return res;
};
