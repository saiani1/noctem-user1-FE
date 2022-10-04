import { basicRequest } from "./base";
import { checkToken } from './../../src/store/utils/token';

const SERVICE = '/user-service';

export const login = async (email: string | undefined, password: string | undefined) => {
  const res = await basicRequest.post(`${SERVICE}/login`, { email, password });
  return res;
}