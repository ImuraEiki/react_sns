import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  selectPosts,
} from '../store/postsSlice';
import type { AppDispatch } from '../store/store';
import { selectUser } from '../store/userSlice';
import { selectfollowing } from '../store/followingSlice';
import { Tab } from './Tab';
import { useLoginUser } from '../hooks/loginUserHooks';
import { PostElement } from './PostElement';
import { Grid, GridCellProps } from 'react-virtualized';

export const PostList = () => {
  const { loginUser, session } = useLoginUser();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } =
    useSelector(selectPosts);
  const users = useSelector(selectUser).users;
  // 初回レンダリング時に投稿を取得
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(1);
  const followings = useSelector(selectfollowing).followings;
  const loginUserFollowingsFollowedId = followings.filter(
    (following) => following.follow_id === loginUser?.id,
  ).map(following => following.followed_id);
  const followingUsersId = users.filter((user) =>
    loginUserFollowingsFollowedId.some((followedId) => followedId === user.id),
  ).map((user) => user.id);
  const followingUsersPosts = posts.filter((post) =>
    followingUsersId.some(
      (followingUserId) =>
        followingUserId === post.userId || loginUser?.id === post.userId,
    ),
  );
  const displayPosts = activeTab === 1 ? posts : followingUsersPosts;

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // TODO: API連携後はIntersection Observer、InfiniteLoader等で書き換える
  const cellRenderer = ({
    columnIndex,
    isScrolling,
    isVisible,
    key,
    parent,
    rowIndex,
    style,
  }: GridCellProps) => {
    const index = rowIndex === 0 ? columnIndex : columnIndex + rowIndex * 4;
    const post = displayPosts[index];
    return (
      index < displayPosts.length && (
        <div key={key} style={style}>
          <PostElement
            post={post}
            userName={users.filter((v) => v.id === post?.userId)[0]?.name || ''}
          />
        </div>
      )
    );
  };

  const VirtualizedList = () => {
    return (
      <Grid
        width={1300}
        columnWidth={300}
        height={500}
        columnCount={4}
        rowCount={Math.ceil(displayPosts.length / 4)}
        rowHeight={150}
        cellRenderer={cellRenderer}
      />
    );
  };

  return (
    <div>
      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        titles={['すべての投稿', 'フォロー中']}
      />
      <div className="py-4">{VirtualizedList()}</div>
    </div>
  );
};