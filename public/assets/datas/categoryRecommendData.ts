import { IList } from '../../../src/types/categoryMenu.d';

const img01 =
  'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg';

export const categoryRecommendData: Array<IList> = [
  {
    id: 1,
    imgUrl: img01,
    title: '아이스 카페 아메리카노',
    englishTitle: 'Iced Caffe Americano',
    price: 4500,
  },
  {
    id: 2,
    imgUrl: img01,
    title: '아이스 블랙 글레이즈드 라떼',
    englishTitle: 'Iced Black Glazed Latte',
    price: 6300,
  },
  {
    id: 3,
    imgUrl: img01,
    title: '아이스 자몽 허니 블랙 티',
    englishTitle: 'Iced Grapefruit Honey Black Tea',
    price: 4500,
  },
];
