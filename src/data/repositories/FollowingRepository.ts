import { fetchFollowings, fetchFollowingByUserId, addFollowing, DeleteFollowingResponse, deleteFollowing } from '../../api/followingApi';
import { Following } from '../../domain/entities/Following';
import { AppDispatch } from '../../store/store';

export interface FollowingRepository {
  addFollowing(following: { followUserId: number; followedUserId: number }): Promise<Following>;
  fetchFollowings(): Promise<Following[]>;
  fetchFollowingByUserId(userId: number): Promise<Following[] | null>;
  deleteFollowing(id: number): Promise<DeleteFollowingResponse>;
}

export class FollowingRepositoryImpl implements FollowingRepository {
  constructor(
    private dispatch: AppDispatch
  ) {}
  async addFollowing(following: { followUserId: number; followedUserId: number }): Promise<Following> {
    const result = await this.dispatch(addFollowing(following)).unwrap();
    return result;
  }
  
  async fetchFollowings(): Promise<Following[]> {
    const result = await this.dispatch(fetchFollowings()).unwrap();
    return result;
  }

  async fetchFollowingByUserId(userId: number): Promise<Following[] | null> {
    const result = await this.dispatch(fetchFollowingByUserId(userId)).unwrap();
    return result;
  }

  async deleteFollowing(id: number): Promise<DeleteFollowingResponse> {
    const result = await this.dispatch(deleteFollowing({id})).unwrap();
    return result;
  }
}