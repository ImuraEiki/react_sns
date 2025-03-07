<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { selectUser, User } from '../store/userSlice';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

export const useLoginUser = () => {
  const { data: session, status } = useSession();
  const [loginUser, setLoginUser] = useState<User>({
    id: 0,
    email: '',
    name: '',
    picture: '',
  });
  const users = useSelector(selectUser).users;
  useEffect(() => {
    setLoginUser(
      users.filter((user) => user.email === session?.user?.email)[0],
    );
  }, [session]);
  return { loginUser, session };
};
=======
import { useEffect, useState } from "react";
import { selectUser, User } from "../store/userSlice";
import { useSession } from 'next-auth/react';
import { useSelector } from "react-redux";

export const useLoginUser = () => {
  const { data: session, status } = useSession();
  const [loginUser, setLoginUser] = useState<User>({id: 0, email: '', name: '', picture: ''});
  const users = useSelector(selectUser).users;
  useEffect(() => {
    setLoginUser(users.filter(user => user.email === session?.user?.email)[0]);
  },[session]);
  return {loginUser, session};
};
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
