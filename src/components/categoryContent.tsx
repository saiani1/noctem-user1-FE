import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/pages/categoryPage.module.scss';

const cx = classNames.bind(styles);

function categoryContent() {
  return (
    <>
      <div className={cx('menu-bar')}>
        <div>음료</div>
        <div>푸드</div>
        <div className={cx('search-bar')}>
          <div />
          <div className={cx('search-icon')}>{/* <SearchIcon /> */}</div>
        </div>
        {/* <div>
          <CartIcon />
        </div> */}
      </div>
      <div className={cx('menu-category')}>
        <ul>
          <li>new</li>
          <li>추천</li>
          <li>리프레셔</li>
          <li>콜드브루</li>
          <li>블론드</li>
          <li>에스프레소</li>
          <li>디카페인 커피</li>
          <li>프라푸치노</li>
          <li>블렌디드</li>
          <li>피지오</li>
          <li>티바나</li>
          <li>브루드 커피</li>
          <li>기타</li>
          <li>병음료</li>
        </ul>
      </div>
      <div className={cx('menu-item')}>
        <div className={cx('menu-img')}>
          <img
            src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
            alt=''
          />
        </div>
        <div className={cx('menu-detail')}>
          <div>아이스 블랙 그레이즈드 라떼</div>
          <div>Iced Black Grazed Latte</div>
          <div>6,300원</div>
        </div>
      </div>
      <div className={cx('menu-item')}>
        <div className={cx('menu-img')}>
          <img
            src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
            alt=''
          />
        </div>
        <div className={cx('menu-detail')}>
          <div>아이스 블랙 그레이즈드 라떼</div>
          <div>Iced Black Grazed Latte</div>
          <div>6,300원</div>
        </div>
      </div>
      <div className={cx('menu-item')}>
        <div className={cx('menu-img')}>
          <img
            src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
            alt=''
          />
        </div>
        <div className={cx('menu-detail')}>
          <div>아이스 블랙 그레이즈드 라떼</div>
          <div>Iced Black Grazed Latte</div>
          <div>6,300원</div>
        </div>
      </div>
      <div className={cx('menu-item')}>
        <div className={cx('menu-img')}>
          <img
            src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
            alt=''
          />
        </div>
        <div className={cx('menu-detail')}>
          <div>아이스 블랙 그레이즈드 라떼</div>
          <div>Iced Black Grazed Latte</div>
          <div>6,300원</div>
        </div>
      </div>
      <div className={cx('menu-item')}>
        <div className={cx('menu-img')}>
          <img
            src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg'
            alt=''
          />
        </div>
        <div className={cx('menu-detail')}>
          <div>아이스 블랙 그레이즈드 라떼</div>
          <div>Iced Black Grazed Latte</div>
          <div>6,300원</div>
        </div>
      </div>
      <div className={cx('choice-store')}>
        <div>
          <div>주문할 매장을 선택하세요</div>
          {/* <div>
            <BackArrowIcon />
          </div> */}
        </div>
        <hr color='white' />
      </div>
    </>
  );
}

export default categoryContent;
