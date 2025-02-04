import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // 現在のページと一致する場合に適用するスタイル
  const linkStyle = (path: string) =>
    location.pathname === path
      ? 'text-yellow-400 font-bold'
      : 'text-white hover:text-gray-300';

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className={linkStyle('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className={linkStyle('/profile')}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
