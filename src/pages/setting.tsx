import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUsername } from '../store/userSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useLoginUser } from '../hooks/loginUserHooks';

export default function Setting() {
  const router = useRouter();
  const { update } = useSession();
<<<<<<< HEAD
  const { loginUser, session } = useLoginUser();
=======
  const {loginUser, session} = useLoginUser();
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState(loginUser?.name);
  useEffect(() => {
    if (loginUser) setNewUsername(loginUser.name);
<<<<<<< HEAD
  }, [loginUser]);

=======
  },[loginUser]);
  
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(updateUsername({ id: loginUser?.id, name: newUsername || '' }));
    await update({
      ...session,
      user: { ...session?.user, name: newUsername },
    });
    router.replace('/profile');
  };

  return (
    <div>
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
