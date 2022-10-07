import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/myMenuContent.module.scss';
import {
  getMyMenu,
  changeMyMenuOrder,
  changeMyMenuNickName,
  deleteMyMenu,
} from '../../../pages/api/myMenu';
import { IMenu } from '../../../src/types/myMenu.d';
import { getToken } from './../../store/utils/token';
import ToggleCheckbox from '../ui/toggleCheckbox';
import EmptyMyMenu from '../content/emptyMyMenu';
import MyMenuItem from '../ui/myMenuItem';

function myMenuContent() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [info, setInfo] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const cx = classNames.bind(styles);
  const router = useRouter();

  // const handleDeleteMenu = (e: React.MouseEventHandler<HTMLButtonElement>) => {
  //   deleteMyMenu()
  // };

  useEffect(() => {
    const token = getToken();
    console.log(token);

    if (info !== undefined && token !== '{}') {
      getMyMenu().then(res => {
        console.log('res : ', res);
        if (res.data.data.length !== 0) {
          setInfo(res.data.data);
          setIsFetching(true);
          console.log(res.data.data);
        } else setIsEmpty(true);
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
    }
  }, []);

  return (
    <div className={cx('wrap')}>
      <h2>나만의 메뉴</h2>
      <div className={cx('option-wrap')}>
        <div className={cx('input-wrap')}>
          <label>HOME에서 바로 주문</label>
          {/* <ToggleCheckbox
            // defaultChecked={defaultChecked}
            // onChange={onChange}
            value=''
          /> */}
        </div>
        <button type='button' className={cx('sort-btn')}>
          <Image src='/assets/svg/icon-sort-arrow.svg' width={13} height={13} />
          순서변경
        </button>
      </div>
      {isEmpty && <EmptyMyMenu />}
      <ul>
        {isFetching &&
          info &&
          info.map((item: IMenu) => (
            <MyMenuItem
              key={item.index}
              item={item}
              // handleDeleteMenu={handleDeleteMenu}
            />
          ))}
      </ul>
    </div>
  );
}

export default myMenuContent;
