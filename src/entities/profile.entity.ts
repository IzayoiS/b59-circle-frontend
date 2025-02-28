export interface ProfileEntity {
  id: string;
  fullName: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | '';
  createdAt: Date;
  updatedAt: Date;
}
