export interface IStep {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  [key: string]: boolean;
}

export interface IError {
  name: false;
  nickName: false;
  birth: false;
  gender: false;
  email: false;
  password: false;
  passwordConfirm: false;
  [key: string]: boolean;
}
