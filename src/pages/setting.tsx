import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUsername } from '../store/userSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Setting() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser).user.users.filter(
    (v) => v.email === session?.user?.email,
  )[0];
  const [newUsername, setNewUsername] = useState(currentUser?.name);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(updateUsername({ id: currentUser?.id, name: newUsername || '' }));
    await update({
      ...session,
      user: { ...session?.user, name: newUsername },
    });
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
