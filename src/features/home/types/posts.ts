export type Profile = {
  fullName: string;
  avatarUrl: string;
};

export type UserPost = {
  profile: Profile;
  username: string;
};

export type Reply = {
  id: string;
  user: UserPost;
  userId: string;
  content: string;
  images?: string;
  likesCount: number;
  createdAt: Date;
};

export type Thread = {
  id: string;
  user: UserPost;
  userId: string;
  content: string;
  images?: string;
  likesCount: number;
  repliesCount: number;
  replies: Reply[];
  isLiked: boolean;
  createdAt: Date;
};
