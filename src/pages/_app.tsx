import type { AppProps } from 'next/app';
import '../styles/globals.css'; // グローバルCSS
import { Layout } from '../components/Layout'; // 共通レイアウト
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import { setUser, clearUser } from '../store/authSlice';
import { Navbar } from '../components/Navbar';
import { FC } from 'react';

const AuthWrapper: FC<any> = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(
        setUser({
          name: user.name || '',
          email: user.email || '',
          picture: user.picture || '',
        }),
      );
    } else {
      dispatch(clearUser());
    }
  }, [isAuthenticated, user, dispatch]);

  return <>{children}</>;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain={ process.env.NEXT_PUBLIC_AUTH0_DOMAIN_ID as string }
        clientId={ process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string }
        authorizationParams={{ redirect_uri: 'http://localhost:3000/' }}
      >
        <Layout>
          <Navbar />
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </Layout>
      </Auth0Provider>
    </Provider>
  );
}
