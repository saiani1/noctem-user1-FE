import { basicRequest } from './base';

const SERVICE = '/user-service';

export const getUserInfo = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/userAccount`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getUserLevel = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/userAccount/grade`, {
    headers: {
      Authorization: token
    },
  });
  return res;
};

export const getUserDetailInfo = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/userAccount/info`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getUserOptions = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/optionalInfo`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const patchUserOptions = async (value: string, token: string) => {
  const res = await basicRequest.patch(
    `${SERVICE}/optionalInfo/${value}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};
