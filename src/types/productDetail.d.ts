export interface IDetail {
  menuId: number;
  price: number;
  allergy: string;
  nutritionList: INutritionList;
  temperatureList: ITemperatureList[];
}

export interface INutritionList {
  id: number;
  kcal: number;
  carbohydrates: number;
  sugars: number;
  sodium: number;
  protein: number;
  fat: number;
  cholesterol: number;
  transFat: number;
  caffeine: number;
  saturatedFat: number;
}

export interface ITemperatureList {
  index: number;
  temperatureId: number;
  menuName: string;
  menuEngName: string;
  description: string;
  menuImg: string;
  temperature: string;
  sizeList: ISizeList;
  [key: string]: number;
}

export interface ISizeList {
  index: number;
  id: number;
  size: string;
  extraCost: number;
}

export interface ICartData {
  sizeId: ISize['sizeId'];
  quantity: number;
  personalOptionList?: IPersonalOption[];
}

export interface ISize {
  index: number;
  sizeId: number;
  size: string;
  extraCost: number;
}

export interface ICup {
  id: number;
  name: string;
}

interface IPersonalOption {
  optionId: number;
  amount: string;
}

export interface ISizeProps {
  list: ISize;
  sizeChoice: string | undefined;
  setSizeChoice: Dispatch<SetStateAction<boolean>>;
  data: IData;
  setData: Dispatch<SetStateAction<boolean>>;
}

export interface INutrition {
  id: number;
  kcal: number;
  carbohydrates: number;
  sugars: number;
  sodium: number;
  protein: number;
  fat: number;
  cholesterol: number;
  transFat: number;
  caffeine: number;
  saturatedFat: number;
}
