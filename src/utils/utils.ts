import { useSelector } from "react-redux";
import { selectUser, User } from "../store/userSlice";
import { selectfollowing } from "../store/followingSlice";

export const targetUserfollowingUsers = (targetUser: User) => {
  const users = useSelector(selectUser).users;
  const followings = useSelector(selectfollowing).followings;
  return users.filter((user) =>
    followings.filter(
      (following) => following.follow_id === targetUser?.id
    ).some(v => v.followed_id === user.id)
)};

export const targetUserFollowers = (targetUser: User) => {
  const users = useSelector(selectUser).users;
  const followings = useSelector(selectfollowing).followings;
  return users.filter((user) => 
   followings.filter(
     (following) => following.followed_id === targetUser?.id
   ).some(v => v.follow_id === user.id)
  );
}
