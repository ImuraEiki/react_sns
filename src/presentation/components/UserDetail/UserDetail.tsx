import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectfollowing } from "../../../store/followingSlice";
import { selectPosts } from "../../../store/postsSlice";
import { selectUser } from "../../../store/userSlice";
import { PostElement } from "../PostList/PostElement";
import { FollowingRepositoryImpl } from "../../../data/repositories/FollowingRepository";
import { AddFollowingUseCase } from "../../../domain/usecase/following/AddFollowingUseCase";

export const UserDetail = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts).posts;
  const displayUser = useSelector(selectUser).users.filter(
    (v) => v.id === Number(pathname?.replace(/\/user\/detail\//, '')),
  )[0];

  const userPosts = posts.filter((post) => post.userId === displayUser?.id);
  const users = useSelector(selectUser).users;
  const loginUserFollowing = useSelector(selectfollowing).followings.filter(
    (following) => following.followUserId === loginUser?.id,
  );
  const isFollowing =
    loginUserFollowing.filter(
      (following) => following.followedUserId === displayUser.id,
    ).length > 0;

  
  const FollowingRepository = new FollowingRepositoryImpl(dispatch);
  const addFollowingUseCase = new AddFollowingUseCase(FollowingRepository);


  const handleFollow = () => {
    if (!loginUser) return;
    if (isFollowing) {
      // dispatch(
      //   unFollowUser({ followUserId: loginUser.id, followedUserId: displayUser.id }),
      // );
    } else {
      addFollowingUseCase.execute(loginUser.id, displayUser.id).catch((err) => console.error(err));
    }
  };

  // if (status === 'loading') return <p>読み込み中...</p>;
  if (!session) return <p>サインインが必要です。</p>;

  return (
    session && (
      <div>
        <img
          src={String(session.user?.image)}
          alt={String(displayUser?.name)}
        />
        <div>{displayUser?.name}'s Profile</div>
        {displayUser?.id !== loginUser?.id &&
          <button
            className={
              'px-4 py-2 text-white rounded-lg' +
              (isFollowing
                ? ' bg-red-500 hover:bg-red-600'
                : ' bg-blue-500 hover:bg-blue-600')
            }
            onClick={handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>}
        {userPosts.length > 0 && <h2>Posts by {displayUser?.name}</h2>}
        {userPosts.map((post) => (
          <PostElement post={post} />
        ))}
      </div>
    )
  );
}