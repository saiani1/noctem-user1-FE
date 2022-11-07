import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

import '../styles/base/_variable.scss';
import '../styles/index.scss';
import { useEffect } from 'react';
function shakeEventDidOccur() {
  //put your own code here etc.
  alert('shake!');
}
const MyApp = ({ Component, pageProps }: AppProps) => {
  var Shake = require('shake.js');
  useEffect(() => {
    var myShakeEvent = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000, // optional, determines the frequency of event generation
    });

    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);

    //function to call when shake occurs
  }, []);

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
