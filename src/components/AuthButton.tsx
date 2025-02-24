import { signIn, signOut, useSession } from 'next-auth/react';

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>ようこそ、{session.user?.name}さん</p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => signOut()}
        >
          サインアウト
        </button>
      </div>
    );
  }
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      onClick={() => signIn('auth0', { redirect: false })}
    >
      サインイン
    </button>
  );
};
