import { userRequest } from "./base";

const SERVICE = '/user-service';

export const getUserInfo = async () => {
  const res = await userRequest.get(`${SERVICE}/userAccount`);
  return res;
}

export const getUserOptions = async () => {
  const res = await userRequest.get(`${SERVICE}/optionalInfo`);
  return res;
}

export const patchUserOptions = async (value: string) => {
  const res = await userRequest.patch(`${SERVICE}/optionalInfo/${value}`);
  return res;
}
