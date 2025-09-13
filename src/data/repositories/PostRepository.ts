import { Post } from '../../domain/entities/Post';
import { fetchPosts, addPost } from '../../store/postsSlice';
import { AppDispatch } from '../../store/store';

export interface PostRepository {
  fetchPosts(): Promise<Post[]>;
  addPost(post: { content: string; userId: number }): Promise<any>;
}

export class PostRepositoryImpl implements PostRepository {
  constructor(private dispatch: AppDispatch) {}

  async fetchPosts(): Promise<Post[]> {
    const result = await this.dispatch(fetchPosts()).unwrap();
    return result;
  }

  async addPost(post: { content: string; userId: number }): Promise<any> {
    await this.dispatch(addPost(post)).unwrap();
  }
}