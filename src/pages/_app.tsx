import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
