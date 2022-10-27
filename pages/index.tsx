import type { NextPage } from 'next';
import Head from 'next/head';
import Main from './main';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Noctem Order</title>
        <meta name='description' content='Noctem Order' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main />
    </>
  );
};

export default Home;
