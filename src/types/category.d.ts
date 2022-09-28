export interface IProps {
  list: IList;
  active: boolean;
  onClick: (id: number, title: string) => void;
}

export interface IList {
  id: number;
  title: string;
}
