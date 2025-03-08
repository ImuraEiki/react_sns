import Link from 'next/link';
import { likePost, Post } from '../store/postsSlice';
import { CommentElement } from './CommentElement';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

interface PostProps {
  post: Post;
  userName?: string;
  isCommentDisp?: boolean;
}

export const PostElement = ({
  post,
  userName,
  isCommentDisp = false,
}: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      key={post?.id}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
      }}
      className="rounded-xl"
    >
      <div>
        <Link
          href={{
            pathname: '/post/detail/[postId]',
            query: { postId: post?.id },
          }}
          className="hover:underline"
        >
          {post?.content}
        </Link>
      </div>
      <button onClick={() => dispatch(likePost(Number(post?.id)))}>
        ❤️ {post?.likes}
      </button>
      <div className="flex flex-row">
        {userName && (
          <Link
            href={{
              pathname: '/user/[userId]',
              query: { userId: post.userId },
            }}
            className="hover:underline"
          >
            {userName}
          </Link>
        )}
        &nbsp;
        <CommentElement postId={post?.id} isCommentDisp={isCommentDisp} />
      </div>
    </div>
  );
};