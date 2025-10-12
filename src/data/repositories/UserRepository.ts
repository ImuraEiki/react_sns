import { fetchUsers, fetchUserById, createUser, updateUserName } from '../../api/userApi';
import { User } from '../../domain/entities/User';
import { AppDispatch } from '../../store/store';

export interface UserRepository {
  createUser(user: { name: string; email: string; accessToken: string }): Promise<User>;
  updateUserName(user: {id: number; name: string; email: string; accessToken: string }): Promise<User>;
  fetchUsers(accessToken: string): Promise<User[]>;
  fetchUserById(userId: number, accessToken: string): Promise<User | null>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private dispatch: AppDispatch
  ) {}

  async createUser(user: { name: string; email: string; accessToken: string }): Promise<User> {
    const result = await this.dispatch(createUser(user)).unwrap();
    return result;
  }

  async updateUserName(user: {id: number; name: string; email: string; accessToken: string }): Promise<User> {
    const result = await this.dispatch(updateUserName(user)).unwrap();
    return result;
  }
  
  async fetchUsers(accessToken: string): Promise<User[]> {
    const result = await this.dispatch(fetchUsers(accessToken)).unwrap();
    return result;
  }

  async fetchUserById(userId: number, accessToken: string): Promise<User | null> {
    const result = await this.dispatch(fetchUserById({userId, accessToken})).unwrap();
    return result;
  }

}