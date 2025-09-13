import { Post } from '../entities/Post';
import { PostRepository } from '../../data/repositories/PostRepository';

export class AddPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(content: string, userId: number | undefined): Promise<any> {
    if (!content.trim()) {
      throw new Error('Content cannot be empty');
    }
    if (!userId) {
      throw new Error('User ID is required');
    }
    await this.postRepository.addPost({ content, userId });
  }
}