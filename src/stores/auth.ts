import { ProfileEntity } from '@/entities/profile.entity';
import { UserEntity } from '@/entities/user.entity';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

type useAuthStore = {
  user: UserProfile;
  setUser: (payload: UserProfile) => void;
  logout: () => void;
  incrementFollowingsCount: () => void;
  decrementFollowingsCount: () => void;
  incrementFollowersCount: () => void;
  decrementFollowersCount: () => void;
};

export const useAuthStore = create<useAuthStore>()(
  devtools((set) => ({
    user: {
      id: '',
      username: '',
      followingsCount: 0,
      followersCount: 0,
      profile: {
        fullName: 'Anonymous',
        avatarUrl: '',
        bio: '',
      },
    } as UserProfile,
    setUser: (payload: UserProfile) => {
      set((state) => ({ user: { ...state.user, ...payload } }));
    },
    logout: () =>
      set(() => ({
        user: {
          id: '',
          username: '',
          followingsCount: 0,
          followersCount: 0,
          profile: {
            fullName: 'Anonymous',
            avatarUrl: '',
            bio: '',
          },
        } as UserProfile,
      })),

    incrementFollowingsCount: () => {
      set((state) => ({
        user: {
          ...state.user,
          followingsCount: (state.user.followingsCount || 0) + 1,
        },
      }));
    },

    decrementFollowingsCount: () => {
      set((state) => ({
        user: {
          ...state.user,
          followingsCount: Math.max((state.user.followingsCount || 0) - 1, 0),
        },
      }));
    },

    incrementFollowersCount: () => {
      set((state) => ({
        user: {
          ...state.user,
          followersCount: (state.user.followersCount || 0) + 1,
        },
      }));
    },

    decrementFollowersCount: () => {
      set((state) => ({
        user: {
          ...state.user,
          followersCount: Math.max((state.user.followersCount || 0) - 1, 0),
        },
      }));
    },
  }))
);
