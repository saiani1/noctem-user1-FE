import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nectem Order</title>
        <meta name='description' content='Nectom Order' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>Test</h1>
        <div>Hello</div>
      </div>
    </>
  );
};

export default Home;
