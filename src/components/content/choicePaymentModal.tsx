/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-hot-toast';

import styles from '../../../styles/content/choicePaymentModal.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../common/sheetContent';
import { cardDatas } from '../../../public/assets/datas/cardDatas';
import { ICardInfo } from '../../types/order';

const cx = classNames.bind(styles);

function choicePaymentModal({
  onDismiss,
  isOpen,
  setCardInfo,
}: {
  onDismiss: () => void;
  isOpen: boolean;
  setCardInfo: React.Dispatch<React.SetStateAction<ICardInfo>>;
}) {
  const [enterCardNumber, setEnterCardNumber] = useState('');
  const [selectCardCompany, setSelectCardCompany] = useState('');
  const [isValid, setIsValid] = useState({
    card: false,
    plan: false,
  });

  const handleInputCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number.isNaN(Number(value))) return;
    setEnterCardNumber(value);
    if (value.length < 16) setIsValid({ ...isValid, card: false });
    else setIsValid({ ...isValid, card: true });
  };

  const handleSelectCard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === '') setIsValid({ ...isValid, plan: false });
    else {
      setIsValid({ ...isValid, plan: true });
      setSelectCardCompany(value);
    }
  };

  const handleSelectInstallmentPlan = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    if (Object.values(isValid).every(v => v === true) === true) {
      setCardInfo({
        company: selectCardCompany,
        card: enterCardNumber
          .split('')
          .map((letter, idx) =>
            idx < enterCardNumber.length - 4 ? '*' : letter,
          )
          .join(''),
      });
      onDismiss();
    } else {
      toast.error('카드종류 / 카드번호를 정확하게 입력해주세요.');
    }
  };

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
                <div className={cx('card-data-wrap')}>
                  <label>카드종류</label>
                  <select
                    title='카드를 선택하세요.'
                    onChange={handleSelectCard}
                  >
                    <option value=''>카드를 선택하세요.</option>
                    {cardDatas &&
                      cardDatas.map((card, i) => (
                        <option key={`card-${i}`}>{card}</option>
                      ))}
                  </select>
                  <img src='/assets/svg/icon-down-arrow.svg' alt='클릭' />
                </div>
                <div className={cx('installment-plan-wrap')}>
                  <label>할부선택</label>
                  <select
                    title='카드 할부를 선택하세요.'
                    onChange={handleSelectInstallmentPlan}
                  >
                    <option>일시불</option>
                    <option>2개월 무이자</option>
                    <option>3개월 무이자</option>
                    <option>4개월 무이자</option>
                    <option>5개월 무이자</option>
                    <option>6개월 무이자</option>
                    <option>7개월 무이자</option>
                  </select>
                  <img src='/assets/svg/icon-down-arrow.svg' alt='클릭' />
                </div>
              </div>
              <label htmlFor='cardnum'>신용카드 번호</label>
              <input
                type='text'
                maxLength={16}
                placeholder='ex) 0000 0000 0000 0000'
                onChange={handleInputCardNumber}
                value={enterCardNumber}
                name='card'
              />
            </div>
            <div className={cx('btn-wrap')}>
              <button
                type='button'
                className={cx('btn')}
                onClick={handleSubmit}
              >
                제출하기
              </button>
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
    </div>
  );
}

export default choicePaymentModal;
