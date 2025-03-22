import followingReducer, { followUser, unFollowUser } from "../followingSlice";

test("followUserを実行するとポストが追加される", () => {
  const initialState = {
    followings: []
  };
  const newState = followingReducer(initialState, followUser({
    follow_id: 501,
    followed_id: 502,
  }));
  expect(newState.followings[0].id).toBe(1);
  expect(newState.followings[0].follow_id).toBe(501);
  expect(newState.followings[0].followed_id).toBe(502);
});
