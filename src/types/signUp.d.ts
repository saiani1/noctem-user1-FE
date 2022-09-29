export interface IStep1Props {
  agreeData: IAgreeData;
  setAgreeData: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<boolean>>;
}

export interface IStep2Props {
  agreeData: IAgreeData;
  inputData: IInputData;
  setInputData: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<boolean>>;
}

export interface IStep3Props {
  nickName: string;
  setStep: Dispatch<SetStateAction<boolean>>;
}

export interface IStep {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  [key: string]: boolean;
}

export interface IData {
  agreeData: IAgreeData;
  inputData: IInputData;
}

export interface IAgreeData {
  all_agr: boolean;
  agr1_use: boolean;
  agr2_info: boolean;
  agr3_ad: boolean;
}

export interface IInputData {
  name: string;
  nickName: string;
  birth: string;
  gender: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IValid {
  name: boolean;
  nickName: boolean;
  birth: boolean;
  gender: boolean;
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
  [key: string]: boolean;
}

export interface IDuplValid {
  nickName: boolean;
  email: boolean;
}

export interface IError {
  name: string;
  nickName: string;
  birth: string;
  gender: string;
  email: string;
  password: string;
  passwordConfirm: string;
  [key: string]: string;
}
