import axios from 'axios';

//baseurl
export const baseURL = 'https://noctem.click/api';
// export const baseURL = "http://localhost:8000/api";
// export const baseURL = 'http://noctem.tk:8000/api';

// 요청
export const basicRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
