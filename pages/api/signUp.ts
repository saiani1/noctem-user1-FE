
import { IParams } from "../../src/types/signUp";
import { basicRequest, userRequest } from "./base";

const SERVICE = '/user-service';

export const getDuplicationCheck = async (name: string, value: string) => {
  const res = await basicRequest.get(`${SERVICE}/duplicationCheck/${name}/${value}`);
  return res;
}

export const patchNickname = async (value: string | undefined) => {
  console.log(`${SERVICE}/userAccount/nickname`);
  const res = await userRequest.patch(`${SERVICE}/userAccount/nickname`, {
    nickname: value
  });
  return res;
}

export const addUser = async (value: IParams) => {
  const res = await basicRequest.post(`${SERVICE}/signUp`, value);
  return res;
}