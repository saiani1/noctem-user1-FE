import React, { useState } from 'react';

import Header from '../src/components/common/header';
import ChoicePaymentModal from '../src/components/content/choicePaymentModal';
import RegisterCashReceiptModal from '../src/components/content/registerCashReceiptModal';
import OrderPayingCompletionModal from '../src/components/content/orderPayingCompletionModal';
import OrderContent from '../src/components/content/orderContent';

function order() {
  const [isClickPaymentBtn, setIsClickPaymentBtn] = useState(false);
  const [isClickCashReceiptBtn, setIsClickCashReceiptBtn] = useState(false);
  const [isClickSubmitBtn, setIsClickSubmitBtn] = useState(false);

  return (
    <>
      {isClickPaymentBtn && (
        <ChoicePaymentModal setIsClickPaymentBtn={setIsClickPaymentBtn} />
      )}
      {isClickCashReceiptBtn && (
        <RegisterCashReceiptModal
          setIsClickCashReceiptBtn={setIsClickCashReceiptBtn}
        />
      )}
      {isClickSubmitBtn && (
        <OrderPayingCompletionModal setIsClickSubmitBtn={setIsClickSubmitBtn} />
      )}
      <Header isClose={false} />
      <OrderContent
        setIsClickPaymentBtn={setIsClickPaymentBtn}
        setIsClickCashReceiptBtn={setIsClickCashReceiptBtn}
        setIsClickSubmitBtn={setIsClickSubmitBtn}
      />
    </>
  );
}

export default order;
