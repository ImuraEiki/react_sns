import { faker } from '@faker-js/faker';

// 50件の投稿データを生成
export const generatePosts = (count = 50) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),  // ランダムなUUID
    content: faker.lorem.sentence(10),  // ランダムな文（10単語程度）
    auther: faker.internet.username(),  // ランダムなユーザー名
    likes: 0,
  }));
};
