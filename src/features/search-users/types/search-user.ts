import { ProfileEntity } from '@/entities/profile.entity';
import { UserEntity } from '@/entities/user.entity';

export type SearchUser = UserEntity & {
  profile: ProfileEntity;
  isFollowed: boolean;
  followedId?: string;
};
