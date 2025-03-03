import Link from "next/link";
import { likePost, Post } from "../store/postsSlice";
import { CommentElement } from "./Comment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

interface PostProps {
  post: Post;
  userName?: string;
}

export const PostElement = ({ post, userName }: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      key={post.id}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
      }}
      className="rounded-xl"
    >
      <p>{post.content}</p>
      <button onClick={() => dispatch(likePost(Number(post.id)))}>
        ❤️ {post.likes}
      </button>
      <div>
        {userName && 
          <Link
            href={{
              pathname: '/user/[userId]',
              query: { userId: post.userId },
            }}
            className="hover:underline"
          >
            {userName}
          </Link>}
      </div>
      <CommentElement postId={post.id} />
    </div>
  )
};