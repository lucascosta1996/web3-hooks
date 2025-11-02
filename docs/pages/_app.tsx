import type { AppProps } from 'next/app';
import 'nextra-theme-docs/style.css';
import SiteFooter from '../components/SiteFooter';
import '../styles.css' 

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SiteFooter />
    </>
  );
}
