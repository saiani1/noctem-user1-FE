import axios from "axios";
import { getToken } from './../../src/store/utils/token';

//baseurl
export const baseURL = "https://noctem.click/api";
// export const baseURL = "http://121.145.206.143:8000/api";

// 토큰 X 요청
export const basicRequest = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  }
});

// 토큰 O 요청
export const userRequest = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: JSON.parse(getToken()),
  }
});
