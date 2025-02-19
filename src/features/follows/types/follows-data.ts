import { SearchUser } from '@/features/search-users/types/search-user';

export type FollowersData = {
  followers: SearchUser[];
  following: SearchUser[];
};
