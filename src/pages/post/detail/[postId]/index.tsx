import { useSelector } from "react-redux";
import { selectPosts } from "../../../../store/postsSlice";
import { usePathname } from "next/navigation";
import { selectUser } from "../../../../store/userSlice";
import { CommentForm } from "../../../../components/CommentForm";
import { PostElement } from "../../../../presentation/components/PostList/PostElement";

export default function PostDetail() {
  const pathname = usePathname();
  const post = useSelector(selectPosts).posts.filter(
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