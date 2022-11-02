import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

import '../styles/base/_variable.scss';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
        <Toaster
          containerStyle={{
            top: 30,
          }}
          toastOptions={{
            duration: 2000,
          }}
        />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
