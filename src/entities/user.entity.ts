import { ProfileEntity } from './profile.entity';

export interface UserEntity {
  id: string;
  email?: string;
  username?: string;
  password?: string;
  followers?: { id: string; username: string; profile: ProfileEntity }[];
  followings?: { id: string; username: string; profile: ProfileEntity }[];
  followersCount?: number;
  followingsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
