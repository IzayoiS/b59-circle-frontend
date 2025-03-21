import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

export interface Follower {
  id: string;
  following: {
    id: string;
    username: string;
    profile: {
      fullName: string;
      avatarUrl?: string;
    };
  };
  isFollowed: boolean;
}

export interface Following {
  id: string;
  followed: {
    id: string;
    username: string;
    profile: {
      fullName: string;
      avatarUrl?: string;
    };
  };
  isFollowed: boolean;
}

export const useFollowers = () => {
  return useQuery<{ followers: Follower[] }>({
    queryKey: ['followers'],
    queryFn: async () => {
      const response = await api.get('/follow/followers');
      return response.data || { followers: [] };
    },
  });
};

export const useFollowings = () => {
  return useQuery<{ followings: Following[] }>({
    queryKey: ['followings'],
    queryFn: async () => {
      const response = await api.get('/follow/followings');
      return response.data || { followings: [] };
    },
  });
};
