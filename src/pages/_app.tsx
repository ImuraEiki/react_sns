import type { AppProps } from 'next/app';
import '../styles/globals.css'; // グローバルCSS
import { Layout } from '../components/Layout'; // 共通レイアウト
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import { loginUser, logoutUser } from '../store/authSlice';
import { Navbar } from '../components/Navbar';
import { FC } from 'react';
import { selectUser } from '../store/userSlice';
import { SessionProvider } from 'next-auth/react';

export default function MySNS({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
