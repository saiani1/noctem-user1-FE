import { getToken } from "../store/utils/token";
import { basicRequest } from "./base";

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken())
  }
}

export const getUserInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/userAccount`, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
}

export const getUserOptions = async () => {
  const res = await basicRequest.get(`${SERVICE}/optionalInfo`, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
}

export const patchUserOptions = async (value: string) => {
  const res = await basicRequest.patch(`${SERVICE}/optionalInfo/${value}`, {}, {
    headers: {
      Authorization: JSON.parse(getToken())
    }
  });
  return res;
}
