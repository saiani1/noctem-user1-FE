import React from 'react';

import Header from '../src/components/common/header';
import SettingContent from '../src/components/content/settingContent';

function setting() {
  return (
    <>
      <Header isClose={false} isBack />
      <SettingContent />
    </>
  );
}

export default setting;
