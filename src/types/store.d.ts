export interface IStore {
  index: number;
  storeId: number;
  name: string;
  mainImg: string;
  address: string;
  businessOpenHours: string;
  businessCloseHours: string;
  isOpen: boolean;
  isParking: boolean;
  isEcoStore: boolean;
  isDriveThrough: boolean;
  distance: string;
}

export interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IStore;
}