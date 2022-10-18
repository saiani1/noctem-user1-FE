import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <Toaster
        containerStyle={{
          top: 30,
        }}
        toastOptions={{
          duration: 2000,
        }}
      />
    </RecoilRoot>
  );
};

export default MyApp;
