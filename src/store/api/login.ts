import { basicRequest } from "./base";

const SERVICE = '/user-service';

export const login = async (email: string, password: string) => {
  const res = await basicRequest.post(`${SERVICE}/login`, { email, password });
  return res;
}