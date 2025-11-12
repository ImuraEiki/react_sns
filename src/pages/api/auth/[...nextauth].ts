import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { logger } from '../../../../lib/logger';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { CreateUserUseCase } from '@/domain/usecase/user/CreateUserUseCase';

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET!,
      issuer: process.env.NEXT_PUBLIC_AUTH0_ISSUER!,
      authorization: {
        params: {
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          scope: "openid profile email"
        },
      }
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        logger.info({
          event: 'new_user_registration',
          user: user.name
        });
        const dispatch = useDispatch<AppDispatch>();
        dispatch(createUser({ name: user.name || '', email: user.email || '', picture: user.image || '' }));
      }
      logger.info({
        event: 'user_sign_in',
        user: user.name
      });
    },
    async signOut({ token }) {
      logger.info({
        event: 'user_sign_out',
        user: token.name
      });
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        jwt: token,
        database: user
      };
    },
  },
});
