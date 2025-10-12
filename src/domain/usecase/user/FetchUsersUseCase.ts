import { User } from '../../entities/User';
import { UserRepository } from '../../../data/repositories/UserRepository';

export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(accessToken: string): Promise<User[]> {
    return this.userRepository.fetchUsers(accessToken);
  }
}