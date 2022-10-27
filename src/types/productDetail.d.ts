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

export interface ICartNonMemberData {
  options: ICartData;
  menuImg: string;
  menuName: string;
  menuEngName: string;
  temperature: string;
  totalMenuPrice: string;
}

export interface ISize {
  index: number;
  sizeId: number;
  size: string;
  extraCost: number;
  capacity: number;
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
  selectedSizeTxt: string | undefined;
  setSelectedSizeTxt: Dispatch<SetStateAction<boolean>>;
  cartData: ICartData;
  setCartData: Dispatch<SetStateAction<boolean>>;
  setExtraCost: Dispatch<SetStateAction<number>>;
  setSelectedSizeId: Dispatch<SetStateAction<number>>;
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
