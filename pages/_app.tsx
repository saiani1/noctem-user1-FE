import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../styles/index.scss';

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
};

export default MyApp;
