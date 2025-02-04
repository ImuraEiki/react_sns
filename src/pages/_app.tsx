import type { AppProps } from 'next/app';
import '../styles/globals.css'; // グローバルCSS
import Layout from '../components/Layout'; // 共通レイアウト

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
