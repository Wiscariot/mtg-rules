import '../styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Head>
     <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Component {...pageProps} />
  </>
}
export default MyApp