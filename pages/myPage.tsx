import React from 'react';
import Header from '../src/components/common/header';
import MyPageContent from '../src/components/content/myPageContent';
import ToolbarList from '../src/components/ui/toolbarList';
import { useSession } from 'next-auth/react';

function myPage() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') console.log('session', session);

  return (
    <>
      {status === 'authenticated' ? (
        <div>로그인 했음</div>
      ) : (
        <div>로그인 안함</div>
      )}
      <Header isClose={false} isBack={false} />
      <MyPageContent />
      <ToolbarList />
    </>
  );
}

export default myPage;
