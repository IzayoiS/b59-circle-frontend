export const isLogin: boolean = false;

interface UserSession {
  fullName: string;
  username: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string;
  backgroundUrl: string;
  bio?: string;
}

export const userSession: UserSession = {
  fullName: 'Iqbal Muhammad Hasbi',
  username: 'iqbal_hasbi',
  backgroundUrl:
    'https://api.dicebear.com/9.x/micah/svg?seed=Iqbal%20M%20Hasbi',
  avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=Iqbal%20M%20Hasbi',
  followersCount: 102,
  followingsCount: 41,
  bio: 'Lover of books and deep conversations.',
};
