import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from '../../../../styles/pages/productPage.module.scss';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetContent from '../../common/sheetContent';
import 'react-spring-bottom-sheet/dist/style.css';
import ProductNurtitionInfo from './productNutritionInfo';
import { INutrition } from '../../../types/productDetail';

const cx = classNames.bind(styles);

function productNutritionSheet({
  nutritionOpen,
  onDismiss,
  nutritionInfo,
}: {
  nutritionOpen: boolean;
  onDismiss: any;
  nutritionInfo: any;
}) {
  const [nutritionSize, setNutritionSize] = useState('Tall');
  const handleNutritionSize = (name: string) => {
    setNutritionSize(name);
  };
  return (
    <>
      <BottomSheet open={nutritionOpen} onDismiss={onDismiss}>
        <SheetContent>
          <div style={{ height: '85vh' }} />

          <div className={cx('nutrition-sheet')}>
            <div>
              <ul className={cx('cupsize')}>
                <li onClick={() => handleNutritionSize('Tall')}>Tall</li>
                <li onClick={() => handleNutritionSize('Grande')}>Grande</li>
                <li onClick={() => handleNutritionSize('Venti')}>Venti</li>
              </ul>
              <div
                className={
                  nutritionSize === 'Tall'
                    ? cx('state-bar-tall')
                    : nutritionSize === 'Grande'
                    ? cx('state-bar-grande')
                    : cx('state-bar-venti')
                }
              />
              <ProductNurtitionInfo
                nutritionInfo={nutritionInfo}
                nutritionSize={nutritionSize}
              />
            </div>
          </div>
        </SheetContent>
      </BottomSheet>
    </>
  );
}

export default productNutritionSheet;
