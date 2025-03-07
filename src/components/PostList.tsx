import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
<<<<<<< HEAD
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
=======
  likePost,
  selectPosts,
  setCurrentPage,
} from '../store/postsSlice';
import type { RootState, AppDispatch } from '../store/store';
import { selectUser } from '../store/userSlice';
import { selectfollowing } from '../store/followingSlice';
import Link from 'next/link';
import { Tab } from './Tab';
import { CommentElement } from './CommentElement';
import { useLoginUser } from '../hooks/loginUserHooks';
import { PostElement } from './PostElement';

export const PostList = () => {
  const {loginUser, session} = useLoginUser();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, currentPage, postsPerPage } =
    useSelector(selectPosts);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const users = useSelector(selectUser).users;

  // 総ページ数の計算
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
  // 初回レンダリング時に投稿を取得
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(1);
<<<<<<< HEAD
=======
  const activeTabClass =
    ' text-blue-500 border-b-2 font-medium border-blue-500';

>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
  const followings = useSelector(selectfollowing).followings;
  const loginUserFollowings = followings.filter(
    (following) => following.follow_id === loginUser?.id,
  );
  const followingUsers = users.filter((user) =>
    loginUserFollowings.some((v) => v.followed_id === user.id),
  );
  const followingUsersPosts = posts.filter((post) =>
    followingUsers.some(
      (followingUser) =>
        followingUser.id === post.userId || loginUser?.id === post.userId,
    ),
  );

  const displayPosts = activeTab === 1 ? posts : followingUsersPosts;

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
<<<<<<< HEAD

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
=======
  
  return (
    <div>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} titles={['すべての投稿', 'フォロー中']} />
      <div className="py-4 grid grid-cols-4 gap-4">
        {displayPosts.map((post) => (
          <PostElement post={post} userName={users.filter((v) => v.id === post.userId)[0]?.name || ''} />
        ))}
      </div>
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
    </div>
  );
};
