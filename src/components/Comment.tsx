import { useSelector } from "react-redux";
import { selectComment } from "../store/commentSlice";
import { selectUser } from "../store/userSlice";

interface CommentProps {
  postId: number;
}

export const CommentElement = ({ postId }: CommentProps) => {
  const comments = useSelector(selectComment).comments.filter(v => v.postId === postId);
  const users = useSelector(selectUser).users;
  return (
    <div>
      {comments.map((comment, i) => (
        <p className="text-gray-500">{comment.content} by {users.filter(user => user.id === comment.userId)[0].name}</p>  
      ))}
    </div>
  )
};
