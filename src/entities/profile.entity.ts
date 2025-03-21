export interface ProfileEntity {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | '';
  createdAt: Date;
  updatedAt: Date;
}

export const defaultProfile: ProfileEntity = {
  id: '',
  fullName: '',
  avatarUrl: null,
  bannerUrl: null,
  bio: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
