import { basicRequest } from "./base";

const SERVICE = '/user-service';

export const login = async (email: string | undefined, password: string | undefined) => {
  const res = await basicRequest.post(`${SERVICE}/login`, { email, password });
  return res;
}