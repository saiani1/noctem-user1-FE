import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/selectStoreContent.module.scss';
import StoreInfo from '../ui/storeInfo';
import ChoiceStoreModal from './choiceStoreModal';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';

function selectStoreContent() {
  const cx = classNames.bind(styles);

  const [open, setOpen] = useState(false);

  function onDismiss() {
    setOpen(false);
  }

  return (
    <>
      <div className={cx('wrap')}>
        <h1 className={cx('title')}>매장 설정</h1>
        <div className={cx('search-input-wrap')}>
          <input type='text' placeholder='검색' />
          <span className={cx('img-wrap')}>
            <Image
              src='/assets/svg/icon-search.svg'
              alt='search'
              width={14}
              height={13}
            />
          </span>
        </div>
        <div className={cx('filter-wrap')}>
          <button type='button'>DT</button>
          <button type='button'>리저브</button>
          <button type='button'>블론드</button>
          <button type='button'>나이트로 콜드브루</button>
          <button type='button'>주차가능</button>
        </div>
        <div className={cx('tab-wrap')}>
          <button type='button' className={cx('active')}>
            가까운 매장
          </button>
          <button type='button'>자주 가는 매장</button>
        </div>
        <StoreInfo setOpen={setOpen} />
        <StoreInfo setOpen={setOpen} />
        <StoreInfo setOpen={setOpen} />
        <StoreInfo setOpen={setOpen} />
      </div>
      <BottomSheet open={open} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <ChoiceStoreModal />
        </SheetContent>
      </BottomSheet>
    </>
  );
}

export default selectStoreContent;
