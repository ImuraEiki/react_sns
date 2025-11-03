import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/posts', () => {
    return HttpResponse.json(
      [
        { id: 1, userId: 1, content: 'Test Post 1' },
        { id: 2, userId: 1, content: 'Test Post 2' },
        { id: 3, userId: 2, content: 'testtesttest' },
        { id: 4, userId: 501, content: '投稿してます' },
      ],
      { status: 200 }
    );
  }),
  http.post(process.env.NEXT_PUBLIC_API_URL + '/api/posts', () => {
    return HttpResponse.json(
      { id: 1, userId: 1, content: 'Test Post 1' },
      { status: 201 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/posts/:postId', ({ params }) => {
    return HttpResponse.json(
      {
        id: Number(params.postId),
        userId: 1,
        content: 'Test Post',
      },
      { status: 200 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/users', () => {
    return HttpResponse.json(
      [
        {"id":501,"name":"eiki","email":process.env.NEXT_PUBLIC_TEST_USER_EMAIL1},
        {"id":1,"name":"user","email":""},
      ],
      { status: 200 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/comments', () => {
    return HttpResponse.json(
      [{ id: 1, email: 'test@example.com', name: 'TestUser' }],
      { status: 200 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/followings', () => {
    return HttpResponse.json(
      [{"id":1,"followUserId":501,"followedUserId":502},{"id":2,"followUserId":502,"followedUserId":501},{"id":3,"followUserId":6,"followedUserId":501},{"id":4,"followUserId":8,"followedUserId":1},{"id":5,"followUserId":8,"followedUserId":1},{"id":6,"followUserId":1,"followedUserId":8},{"id":7,"followUserId":501,"followedUserId":504},{"id":8,"followUserId":501,"followedUserId":466},{"id":9,"followUserId":501,"followedUserId":452},{"id":10,"followUserId":502,"followedUserId":452},{"id":11,"followUserId":501,"followedUserId":483},{"id":12,"followUserId":501,"followedUserId":20},{"id":13,"followUserId":501,"followedUserId":1}],
      { status: 200 }
    );
  }),
];

export const server = setupServer(...handlers);