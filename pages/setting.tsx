import React from 'react';

import Header from '../src/components/common/header';
import withAuth from '../src/components/common/withAuth';
import SettingContent from '../src/components/content/settingContent';

function setting() {
  return (
    <>
      <Header isClose={false} isBack />
      <SettingContent />
    </>
  );
}

export default withAuth(setting);
