<<<<<<< HEAD
import { useSelector } from 'react-redux';
import { PostElement } from '../../../../components/PostElement';
import { selectPosts } from '../../../../store/postsSlice';
import { usePathname } from 'next/navigation';
import { selectUser } from '../../../../store/userSlice';
import { CommentForm } from '../../../../components/CommentForm';
=======
import { useSelector } from "react-redux";
import { PostElement } from "../../../../components/PostElement";
import { selectPosts } from "../../../../store/postsSlice";
import { usePathname } from "next/navigation";
import { selectUser } from "../../../../store/userSlice";
import { CommentForm } from "../../../../components/CommentForm";
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e

export default function PostDetail() {
  const pathname = usePathname();
  const post = useSelector(selectPosts).posts.filter(
<<<<<<< HEAD
    (v) => v.id == Number(pathname?.replace(/\/post\/detail\//, '')),
  )[0];
  const userName = useSelector(selectUser).users.filter(
    (user) => user.id === post?.userId,
  )[0]?.name;
  if (!pathname) return;
  return (
    <div>
      <PostElement post={post} userName={userName} isCommentDisp={true} />
      <CommentForm />
    </div>
  );
}
=======
    v => v.id == Number(pathname?.replace(/\/post\/detail\//, ''))
  )[0];
  const userName = useSelector(selectUser).users.filter(user => user.id === post?.userId)[0]?.name;
  if (!pathname) return;
  return (
    <div>
      <PostElement post={post} userName={userName} isCommentDisp={true}  />
      <CommentForm />
    </div>
  );
}
>>>>>>> 4698c0481d7c0d8172933d457d9b70b477b20b3e
