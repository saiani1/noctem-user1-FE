/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/choicePaymentModal.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import { cardDatas } from '../../../public/assets/datas/cardDatas';

const cx = classNames.bind(styles);

function choicePaymentModal({
  onDismiss,
  isOpen,
}: {
  onDismiss: () => void;
  isOpen: boolean;
}) {
  return (
    <div className={cx('test')}>
      <BottomSheet open={isOpen} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <div className={cx('wrap')}>
            <h2>결제 수단</h2>
            <div className={cx('input-wrap')}>
              <input type='radio' id='card' defaultChecked />
              <label htmlFor='card'>신용카드</label>
            </div>
            <div className={cx('card-info-wrap')}>
              <div className={cx('selectbox-wrap')}>
                <span className={cx('label')}>카드종류</span>
                <select title='카드를 선택하세요.'>
                  <option value=''>카드를 선택하세요.</option>
                  {cardDatas &&
                    cardDatas.map((card, i) => (
                      <option key={`card-${i}`} value={i}>
                        {card}
                      </option>
                    ))}
                </select>
                <span className={cx('label')}>할부선택</span>
                <select title='카드 할부를 선택하세요.'>
                  <option value=''>일시불</option>
                  <option value='2'>2개월 무이자</option>
                  <option value='3'>3개월 무이자</option>
                  <option value='4'>4개월 무이자</option>
                  <option value='5'>5개월 무이자</option>
                  <option value='6'>6개월 무이자</option>
                  <option value='7'>7개월 무이자</option>
                </select>
              </div>
              <label htmlFor='cardnum'>신용카드 번호</label>
              <input
                type='number'
                maxLength={16}
                placeholder='ex) 0000 0000 0000 0000'
                id='cardnum'
              />
            </div>
            <div className={cx('btn-wrap')}>
              <button type='button' className={cx('btn')} onClick={onDismiss}>
                선택하기
              </button>
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
    </div>
  );
}

export default choicePaymentModal;
