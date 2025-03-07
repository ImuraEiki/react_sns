<<<<<<< HEAD
import Link from 'next/link';
import { likePost, Post } from '../store/postsSlice';
import { CommentElement } from './CommentElement';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
=======
import Link from "next/link";
import { likePost, Post } from "../store/postsSlice";
import { CommentElement } from "./CommentElement";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e

interface PostProps {
  post: Post;
  userName?: string;
  isCommentDisp?: boolean;
}

<<<<<<< HEAD
export const PostElement = ({
  post,
  userName,
  isCommentDisp = false,
}: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      key={post?.id}
=======
export const PostElement = ({ post, userName, isCommentDisp = false }: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      key={post.id}
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
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
<<<<<<< HEAD
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
=======
            query: { postId: post.id },
          }}
          className="hover:underline"
        >
          {post.content}
        </Link>
      </div>
      <button onClick={() => dispatch(likePost(Number(post.id)))}>
        ❤️ {post.likes}
      </button>
      <div>
        {userName && 
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
          <Link
            href={{
              pathname: '/user/[userId]',
              query: { userId: post.userId },
            }}
            className="hover:underline"
          >
            {userName}
<<<<<<< HEAD
          </Link>
        )}
        &nbsp;
        <CommentElement postId={post?.id} isCommentDisp={isCommentDisp} />
      </div>
    </div>
  );
};
=======
          </Link>}
      </div>
      <CommentElement postId={post.id} isCommentDisp={isCommentDisp} />
    </div>
  )
};
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
