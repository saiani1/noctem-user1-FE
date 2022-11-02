import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/levelInfoTab.module.scss';
import {
  ElixirLevelUpBtn,
  MoneyBtn,
  PowerElixirLevelBtn,
  PowerElixirLevelUpBtn,
  UserPlusBtn,
} from '../../../public/assets/svg';

function levelInfoTab() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('content-wrap')}>
      <span className={cx('sub-tit')}>멤버십 등급</span>
      <div className={cx('level-wrap', 'first')}>
        <div className={cx('level-tit-wrap')}>
          <span className={cx('level-icon-wrap')}>
            <Image
              src='/assets/svg/icon-potion-level.svg'
              width={16}
              height={20}
            />
          </span>
          <h3 className={cx('level-tit')}>Potion</h3>
          <span className={cx('kor-name')}>포션</span>
        </div>
        <div className={cx('level-content-wrap')}>
          <UserPlusBtn className={cx('icon')} />
          <span className={cx('content')}>
            카페녹템에 가입하시면 Potion Level이 됩니다.
          </span>
        </div>
        <div className={cx('level-content-wrap')}>
          <MoneyBtn className={cx('icon', 'money')} />
          <span className={cx('content')}>5,000원 구매시 1HP UP</span>
        </div>
      </div>

      <div className={cx('level-wrap')}>
        <div className={cx('level-tit-wrap')}>
          <span className={cx('level-icon-wrap')}>
            <Image
              src='/assets/svg/icon-elixir-level.svg'
              width={16}
              height={20}
            />
          </span>
          <h3 className={cx('level-tit', 'e')}>Elixir</h3>
          <span className={cx('kor-name')}>엘릭서</span>
        </div>
        <div className={cx('level-content-wrap')}>
          <ElixirLevelUpBtn className={cx('icon')} />
          <span className={cx('content')}>
            20HP를 모으면 Elixer Level이 됩니다.
          </span>
        </div>
      </div>

      <div className={cx('level-wrap', 'pe')}>
        <div className={cx('level-tit-wrap')}>
          <PowerElixirLevelBtn className={cx('icon')} />
          <h3 className={cx('level-tit', 'pe')}>Power Elixir</h3>
          <span className={cx('kor-name')}>파워 엘릭서</span>
        </div>
        <div className={cx('level-content-wrap')}>
          <PowerElixirLevelUpBtn className={cx('icon')} />
          <span className={cx('content')}>
            80HP를 모으면 Power Elixir Level이 됩니다.
          </span>
        </div>
      </div>
    </div>
  );
}

export default levelInfoTab;
