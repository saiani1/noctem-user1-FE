export interface IProps {
  list: ISize;
  sizeChoice: string | undefined;
  setSizeChoice: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<boolean>>;
}
export interface ISize {
  index: number;
  sizeId: number;
  size: string;
  extraCost: number;
}
