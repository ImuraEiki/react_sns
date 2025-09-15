import { fetchPosts, fetchPostById, addPost } from '../../api/postApi';
import { Post } from '../../domain/entities/Post';
import { AppDispatch } from '../../store/store';

export interface PostRepository {
  fetchPosts(): Promise<Post[]>;
  fetchPostById(postId: number): Promise<Post | null>;
  addPost(post: { content: string; userId: number }): Promise<any>;
}

export class PostRepositoryImpl implements PostRepository {
  constructor(
    private dispatch: AppDispatch
  ) {}

  async fetchPosts(): Promise<Post[]> {
    const result = await this.dispatch(fetchPosts()).unwrap();
    return result;
  }

  async fetchPostById(postId: number): Promise<Post | null> {
    const result = await this.dispatch(fetchPostById(postId)).unwrap();
    return result;
  }

  async addPost(post: { content: string; userId: number }): Promise<any> {
    await this.dispatch(addPost(post)).unwrap();
  }
}