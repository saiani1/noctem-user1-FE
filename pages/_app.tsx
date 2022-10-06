import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
