import React from 'react';

import Header from '../src/components/common/header';
import SettingContent from '../src/components/content/settingContent';

function setting() {
  return (
    <>
      <Header isClose={false} />
      <SettingContent />
    </>
  );
}

export default setting;
