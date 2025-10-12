import followingReducer, { followUser, unFollowUser } from "../followingSlice";

test("followUserを実行するとポストが追加される", () => {
  const initialState = {
    followings: []
  };
  const newState = followingReducer(initialState, followUser({
    followUserId: 501,
    followedUserId: 502,
  }));
  expect(newState.followings[0].id).toBe(1);
  expect(newState.followings[0].followUserId).toBe(501);
  expect(newState.followings[0].followedUserId).toBe(502);
});
