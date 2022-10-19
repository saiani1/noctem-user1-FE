import { ICart } from "../../types/cart";

export const addComma = (money: number) => {
  return money.toLocaleString();
};

// 비회원 장바구니 개수 조회
export const getSessionCartCount = () => {
  let i = 0;
  let count = 0;
  while (true) {
    if (i >= 20) {
      break;
    }

    if (typeof sessionStorage.getItem(i + '') === 'string') {
      count++;
    }
    i++;
  }

  return count;
};

// 비회원 장바구니 데이터 조회
export const getSessionCartList = () => {
  let data: ICart[] = [];
  let i = 0;
  let count = 0;
  while (true) {
    if (i >= 20) {
      break;
    }

    if (typeof sessionStorage.getItem(i + '') === 'string') {
      data.push(JSON.parse(sessionStorage.getItem(i + '') || ''));
    }
    i++;
  }

  return data;
};