import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../../styles/content/signUp/certified.module.scss';

const cx = classNames.bind(styles);

function certified() {
  return (
    <div className={cx('content-wrap')}>
      <div className={cx('title')}>
        본인확인을 위해
        <br />
        인증을 진행해 주세요.
      </div>
      <div>
        <input
          type='text'
          name='name'
          id='name'
          className={cx('input', 'input-big')}
          placeholder='이름'
        />
        <input
          type='text'
          name='birth'
          id='birth'
          className={cx('input', 'input-big')}
          placeholder='생년월일 6자리'
        />
        <input
          type='text'
          name='phone'
          id='phone'
          className={cx('input', 'input-big')}
          placeholder='휴대폰 번호'
        />
      </div>
    </div>
  );
}

export default certified;
