
import { getToken } from "../../src/store/utils/token";
import { IParams } from "../../src/types/signUp";
import { basicRequest } from "./base";

const SERVICE = '/user-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken())
  }
}

export const getDuplicationCheck = async (name: string, value: string) => {
  const res = await basicRequest.get(`${SERVICE}/duplicationCheck/${name}/${value}`);
  return res;
}

export const patchNickname = async (value: string | undefined) => {
  console.log(`${SERVICE}/userAccount/nickname`);
  const res = await basicRequest.patch(`${SERVICE}/userAccount/nickname`, {
    nickname: value
  }, HEADERS);
  return res;
}

export const addUser = async (value: IParams) => {
  const res = await basicRequest.post(`${SERVICE}/signUp`, value);
  return res;
}