import type { AppProps } from 'next/app';
import '../styles/index.scss';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />;
    </RecoilRoot>
  );
};

export default MyApp;
