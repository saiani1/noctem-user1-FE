import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTheme } from 'next-themes';

import styles from '../../../styles/content/settingContent.module.scss';
import { getUserOptions, patchUserOptions } from '../../../src/store/api/user';
import ToggleCheckbox from '../ui/toggleCheckbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from '../../store/atom/userStates';
import { toast } from 'react-hot-toast';
import { shakeToPayState } from '../../store/atom/optionState';

interface IInfo {
  isDarkmode: boolean;
  pushNotificationAgreement: boolean;
  advertisementAgreement: boolean;
  useLocationInfoAgreement: boolean;
  shakeToPay: boolean;
}

function settingContent() {
  const token = useRecoilValue(tokenState);
  const { theme, setTheme } = useTheme();
  const [info, setInfo] = useState<IInfo>({
    isDarkmode: false,
    pushNotificationAgreement: false,
    advertisementAgreement: false,
    useLocationInfoAgreement: false,
    shakeToPay: false,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [shakeState, setShakeState] = useRecoilState(shakeToPayState);
  const cx = classNames.bind(styles);

  useEffect(() => {
    getUserOptions(token).then(res => {
      setInfo(res.data.data);
      setIsFetching(true);
    });
  }, []);

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const check = e.target.checked;

    patchUserOptions(value, token).then(() => {
      setInfo({ ...info, [value]: check });
      toast.success('정상적으로 변경되었습니다.');
    });

    if (value === 'darkmode') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    } else if (value === 'shakeToPay') {
      setShakeState(!shakeState);
    }
  };

  return (
    <div className={cx('wrap')}>
      <h2>설정</h2>
      {isFetching && (
        <ul className={cx('setting-li-wrap')}>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>푸쉬 알림</label>
            <ToggleCheckbox
              defaultChecked={info?.pushNotificationAgreement}
              onChange={handleChangeOption}
              value='pushNotification'
            />
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>프로모션/이벤트 알림 수신</label>
            <ToggleCheckbox
              defaultChecked={info?.advertisementAgreement}
              onChange={handleChangeOption}
              value='advertisement'
            />
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>위치 정보 서비스 이용약관 동의</label>
            <ToggleCheckbox
              defaultChecked={info?.useLocationInfoAgreement}
              onChange={handleChangeOption}
              value='location'
            />
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>Shake to pay 설정</label>
            <ToggleCheckbox
              defaultChecked={info?.shakeToPay}
              onChange={handleChangeOption}
              value='shakeToPay'
            />
          </li>
          <li className={cx('setting-li')}>
            <label htmlFor='push'>다크모드</label>
            <ToggleCheckbox
              defaultChecked={info?.isDarkmode}
              onChange={handleChangeOption}
              value='darkmode'
            />
          </li>
        </ul>
      )}
    </div>
  );
}

export default settingContent;
