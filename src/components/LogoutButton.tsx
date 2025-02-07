import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      onClick={() => logout()}
    >
      ログアウト
    </button>
  );
};
