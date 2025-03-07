import { PostForm } from '../components/PostForm';
import { PostList } from '../components/PostList';

export default function Home() {
  return (
    <div>
      <PostList />
      <PostForm />
    </div>
  );
}
