interface User {
  fullName: string;
  email: string;
  username: string;
  password: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string;
  backgroundUrl: string;
  bio?: string;
}

export const userDatas: User[] = [
  {
    fullName: 'Iqbal Muhammad Hasbi',
    username: 'iqbal_hasbi',
    email: 'iqbal@gmail.com',
    password: '12345678',
    followersCount: 100,
    followingsCount: 50,
    avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Iqbal%20M%20Hasbi',
    backgroundUrl: 'https://api.dicebear.com/9.x/glass/svg?seed=test',
    bio: 'Lover of books and deep conversations.',
  },
  {
    fullName: 'test2',
    username: 'test2',
    email: 'test2@gmail.com',
    password: '1234',
    followersCount: 1,
    followingsCount: 1000,
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=test2',
    backgroundUrl: 'https://api.dicebear.com/9.x/glass/svg?seed=test2',
    bio: 'Haiiiii',
  },
];
