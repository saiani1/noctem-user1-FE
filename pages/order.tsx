import React, { useState } from 'react';

import Header from '../src/components/common/header';
import ChoicePaymentModal from '../src/components/content/choicePaymentModal';
import RegisterCashReceiptModal from '../src/components/content/registerCashReceiptModal';
import OrderPayingCompletionModal from '../src/components/content/orderPayingCompletionModal';
import OrderContent from '../src/components/content/orderContent';
import ToolbarList from '../src/components/ui/toolbarList';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../src/components/common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';

function order() {
  const [isClickPaymentBtn, setIsClickPaymentBtn] = useState(false);
  const [isClickCashReceiptBtn, setIsClickCashReceiptBtn] = useState(false);
  const [isClickSubmitBtn, setIsClickSubmitBtn] = useState(false);

  return (
    <>
      <Header isClose={false} isBack />
      <OrderContent
        isClickPaymentBtn={isClickPaymentBtn}
        isClickCashReceiptBtn={isClickCashReceiptBtn}
        isClickSubmitBtn={isClickSubmitBtn}
        setIsClickPaymentBtn={setIsClickPaymentBtn}
        setIsClickCashReceiptBtn={setIsClickCashReceiptBtn}
        setIsClickSubmitBtn={setIsClickSubmitBtn}
      />

      {!isClickPaymentBtn && !isClickCashReceiptBtn && !isClickSubmitBtn && (
        <ToolbarList />
      )}
    </>
  );
}

export default order;
