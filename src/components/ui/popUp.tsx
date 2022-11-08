import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/popUp.module.scss';
import { CloseBtn } from '../../../public/assets/svg';
import { data } from '../../../public/assets/datas/data';

const cx = classNames.bind(styles);

interface IProps {
  index: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function popUp({ index, setOpen }: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={cx('wrap')}>
      <div className={cx('top')}>
        <button type='button' onClick={handleClose}>
          <CloseBtn className={cx('icon')} />
        </button>
      </div>
      <div className={cx('comment')}>
        <p>{index + 1}번째 그림을 찾으셨습니다! 🎉</p>
        <span>( 그림은 총 5장입니다. )</span>
      </div>
      <div className={cx('img-wrap')}>
        <img src={data[index]} className={cx('img')} />
      </div>
    </div>
  );
}

export default popUp;
