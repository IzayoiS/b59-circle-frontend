import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toaster';
import { SearchUser } from '@/features/search-users/types/search-user';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import { BoxProps } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export interface ButtonFollowProps extends BoxProps {
  followsData: SearchUser;
  isFollowingList?: boolean;
  isFollowersList?: boolean;
  onFollowChange?: () => void;
}

export default function FollowButton({
  followsData,
  isFollowingList = false,
  isFollowersList = false,
  onFollowChange,
}: ButtonFollowProps) {
  const queryClient = useQueryClient();
  const { user: userLogin } = useAuthStore();
  const [isFollowed, setIsFollowed] = useState(
    followsData?.isFollowed ?? false
  );

  useEffect(() => {
    setIsFollowed(followsData?.isFollowed ?? false);
  }, [followsData?.isFollowed]);

  const { mutateAsync: mutateFollow } = useMutation({
    mutationKey: ['follow'],
    mutationFn: async () => {
      const response = await api.post('/follow', {
        followedId: followsData.id,
      });
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({
        title: 'Failed to follow!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      setIsFollowed(true);
      onFollowChange?.();
      await queryClient.invalidateQueries({ queryKey: ['followings'] });
      await queryClient.invalidateQueries({ queryKey: ['followers'] });
      await queryClient.invalidateQueries({ queryKey: ['search-users'] });
    },
  });

  const { mutateAsync: mutateUnfollow } = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: async () => {
      if (!followsData.followedId) {
        throw new Error('Followed ID is missing!');
      }
      await api.delete(`/follow/${followsData.followedId}`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({
        title: 'Failed to unfollow!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      setIsFollowed(false);
      onFollowChange?.();
      await queryClient.invalidateQueries({ queryKey: ['followings'] });
      await queryClient.invalidateQueries({ queryKey: ['followers'] });
      await queryClient.invalidateQueries({ queryKey: ['search-users'] });
    },
  });

  async function toggleFollow() {
    if (isFollowed) {
      await mutateUnfollow();
    } else {
      await mutateFollow();
    }
  }

  return (
    <>
      {followsData.id !== userLogin.id &&
        (isFollowersList || isFollowingList) && (
          <Button
            height={'30px'}
            backgroundColor={'transparent'}
            borderRadius={'20px'}
            _hover={{ backgroundColor: 'gray.600' }}
            width={isFollowed ? '100px' : '80px'}
            border={isFollowed ? '1px solid white' : '1px solid gray'}
            color={isFollowed ? 'gray.400' : 'white'}
            onClick={toggleFollow}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </Button>
        )}
    </>
  );
}
