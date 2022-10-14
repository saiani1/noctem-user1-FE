import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../../styles/pages/productPage.module.scss';

const cx = classNames.bind(styles);

function productNurtitionInfo({
  nutritionInfo,
  nutritionSize,
}: {
  nutritionInfo: any;
  nutritionSize: string;
}) {
  const [multiples, setMultiples] = useState(355);
  useEffect(() => {
    if (nutritionSize === 'Tall') {
      setMultiples(355);
    } else if (nutritionSize === 'Grande') {
      setMultiples(473);
    } else {
      setMultiples(591);
    }
  }, [nutritionSize]);

  return (
    <>
      <div className={cx('size')}>{multiples}ml</div>
      <ul className={cx('nutrition-kind')}>
        <li>
          <div>칼로리</div>
          <div>{Math.floor(nutritionInfo.kcal * multiples)}kcal</div>
        </li>
        <hr />
        <li>
          <div>탄수화물</div>
          <div>{Math.floor(nutritionInfo.carbohydrates * multiples)}g</div>
        </li>
        <hr />
        <li>
          <div>당류</div>
          <div>{Math.floor(nutritionInfo.sugers * multiples)}g</div>
        </li>
        <hr />
        <li>
          <div>나트륨</div>
          <div>{Math.floor(nutritionInfo.sodium * multiples * 100)}mg</div>
        </li>
        <hr />
        <li>
          <div>단백질</div>
          <div>{Math.floor(nutritionInfo.protein * multiples)}g</div>
        </li>
        <hr />
        <li>
          <div>지방</div>
          <div>{Math.floor(nutritionInfo.fat * multiples)}g</div>
        </li>
        <hr />
        <li>
          <div>콜레스테롤</div>
          <div>{Math.floor(nutritionInfo.cholesterol * multiples * 100)}mg</div>
        </li>
        <hr />
        <li>
          <div>트렌스지방</div>
          <div>{Math.floor(nutritionInfo.transFat * multiples)}g</div>
        </li>
        <hr />
        <li>
          <div>카페인</div>
          <div>{Math.floor(nutritionInfo.caffeine * multiples)}mg</div>
        </li>
        <hr />
        <li>
          <div>포화지방</div>
          <div>{Math.floor(nutritionInfo.saturateFat * multiples)}g</div>
        </li>
        <hr />
      </ul>
    </>
  );
}

export default productNurtitionInfo;
