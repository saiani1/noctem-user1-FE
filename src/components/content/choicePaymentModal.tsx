/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/choicePaymentModal.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';

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
