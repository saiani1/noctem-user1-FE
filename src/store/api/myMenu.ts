import { IParams } from '../../types/myMenu';
import { basicRequest } from './base';

const U_SERVICE = '/user-service';
const M_SERVICE = '/menu-service';

export const getMyMenuData = async (token: string) => {
  const res = await basicRequest.get(`${U_SERVICE}/myMenu`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getMyMenuDetailData = async (
  sizeId: number,
  myMenuId: number,
  token: string,
) => {
  const res = await basicRequest.get(
    `${M_SERVICE}/size/menu/forMyMenu/${sizeId}/${myMenuId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

export const addMyMenu = async (value: IParams, token: string) => {
  const res = await basicRequest.post(`${U_SERVICE}/myMenu`, value, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const changeMyMenuOrder = async (value: number[], token: string) => {
  const res = await basicRequest.patch(
    `${U_SERVICE}/myMenu/order`,
    {
      myMenuIdOrderList: value,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

export const changeMyMenuNickName = async (
  id: number,
  value: string,
  token: string,
) => {
  const res = await basicRequest.patch(
    `${U_SERVICE}/myMenu/${id}/alias`,
    {
      alias: value,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

export const deleteMyMenu = async (id: number, token: string) => {
  const res = await basicRequest.delete(`${U_SERVICE}/myMenu/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getShowMainMyMenu = async (token: string) => {
  const res = await basicRequest.get(`${U_SERVICE}/optionalInfo/orderHome`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const changeShowMainMyMenu = async (token: string) => {
  const res = await basicRequest.patch(
    `${U_SERVICE}/optionalInfo/orderHome`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};
