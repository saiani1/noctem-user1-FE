import React, { useState } from 'react';

import Header from '../src/components/common/header';
import OrderContent from '../src/components/content/orderContent';
import 'react-spring-bottom-sheet/dist/style.css';

function order() {
  const [isClickPaymentBtn, setIsClickPaymentBtn] = useState(false);
  const [isClickSubmitBtn, setIsClickSubmitBtn] = useState(false);

  return (
    <>
      <Header isClose={false} isBack />
      <OrderContent
        isClickPaymentBtn={isClickPaymentBtn}
        isClickSubmitBtn={isClickSubmitBtn}
        setIsClickPaymentBtn={setIsClickPaymentBtn}
        setIsClickSubmitBtn={setIsClickSubmitBtn}
      />
    </>
  );
}

export default order;
