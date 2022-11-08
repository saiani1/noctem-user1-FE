import { IParams } from "../../types/signUp";
import { basicRequest } from "./base";

const SERVICE = '/user-service';

export const getDuplicationCheck = async (name: string, value: string) => {
  const res = await basicRequest.get(`${SERVICE}/duplicationCheck/${name}/${value}`);
  return res;
}

export const patchNickname = async (value: string, token: string) => {
  const res = await basicRequest.patch(`${SERVICE}/userAccount/nickname`, {
    nickname: value
  }, {
    headers: {
      Authorization: token,
    }
  });
  return res;
}

export const addUser = async (value: IParams) => {
  const res = await basicRequest.post(`${SERVICE}/signUp`, value);
  return res;
}