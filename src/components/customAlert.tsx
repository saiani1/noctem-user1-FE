import React from 'react';
import classNames from 'classnames/bind';
// import styles from '../../styles/ui/customAlert.scss';

// const cx = classNames.bind(styles);

interface IProps {
  title: string;
  desc: string;
  btnTitle: string;
  id?: number;
  onAction: (id?: number) => void;
  onClose: () => void;
}

function customAlert(props: IProps) {
  const { title, desc, btnTitle, id, onAction, onClose } = props;
  // 제목, 내용, 버튼 내용, 인자, confirm 함수, close 함수
  return (
    <div className='popup-overlay'>
      <h1>{title}</h1>
      <p>{desc}</p>
      <div className='btn-group'>
        <button type='button' onClick={onClose} className='btn-cancel'>
          취소
        </button>
        <button
          type='button'
          onClick={() => {
            onAction(id);
            onClose();
          }}
          className='btn-confirm'
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
}

export default customAlert;
