export interface IProps {
  list: IList;
}

export interface IList {
  id: number;
  imgUrl: string;
  title: string;
  englishTitle: string;
  price: number;
}
