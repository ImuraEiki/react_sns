<<<<<<< HEAD
import { useSelector } from 'react-redux';
import { selectUser, User } from '../store/userSlice';
import { selectfollowing } from '../store/followingSlice';
=======
import { useSelector } from "react-redux";
import { selectUser, User } from "../store/userSlice";
import { selectfollowing } from "../store/followingSlice";
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e

export const targetUserfollowingUsers = (targetUser: User) => {
  const users = useSelector(selectUser).users;
  const followings = useSelector(selectfollowing).followings;
  return users.filter((user) =>
<<<<<<< HEAD
    followings
      .filter((following) => following.follow_id === targetUser?.id)
      .some((v) => v.followed_id === user.id),
  );
};
=======
    followings.filter(
      (following) => following.follow_id === targetUser?.id
    ).some(v => v.followed_id === user.id)
)};
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e

export const targetUserFollowers = (targetUser: User) => {
  const users = useSelector(selectUser).users;
  const followings = useSelector(selectfollowing).followings;
<<<<<<< HEAD
  return users.filter((user) =>
    followings
      .filter((following) => following.followed_id === targetUser?.id)
      .some((v) => v.follow_id === user.id),
  );
};
=======
  return users.filter((user) => 
   followings.filter(
     (following) => following.followed_id === targetUser?.id
   ).some(v => v.follow_id === user.id)
  );
}
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
