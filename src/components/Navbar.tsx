import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';

export const Navbar = () => {
  // const location = useLocation();

  // 現在のページと一致する場合に適用するスタイル
  const linkStyle = (path: string) =>
    path ? 'text-yellow-400 font-bold' : 'text-white hover:text-gray-300';

  const { isAuthenticated } = useAuth0();
  return <nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</nav>;
};
