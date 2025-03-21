import { SearchUser } from '@/features/search-users/types/search-user';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/libs/api';
import { isAxiosError } from 'axios';
import { toaster } from '../ui/toaster';
import { useAuthStore } from '@/stores/auth';

interface SuggestedFollowingProps {
  SuggestedFollowingUser: SearchUser;
  goToProfile: (username: string) => void;
}

export default function SuggestedFollowing({
  SuggestedFollowingUser,
  goToProfile,
}: SuggestedFollowingProps) {
  const queryClient = useQueryClient();
  const { incrementFollowingsCount, decrementFollowingsCount } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(
    SuggestedFollowingUser.isFollowed
  );

  const { mutateAsync: mutateFollow } = useMutation({
    mutationKey: ['follow'],
    mutationFn: async () => {
      const response = await api.post('/follow', {
        followedId: SuggestedFollowingUser.id,
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
      setIsFollowing(true);
      incrementFollowingsCount();
      await queryClient.invalidateQueries({ queryKey: ['suggested-users'] });
    },
  });

  const { mutateAsync: mutateUnfollow } = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: async () => {
      await api.delete(`/follow/${SuggestedFollowingUser.id}`);
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
      setIsFollowing(false);
      decrementFollowingsCount();
      await queryClient.invalidateQueries({ queryKey: ['suggested-users'] });
    },
  });

  async function toggleFollow() {
    if (isFollowing) {
      await mutateUnfollow();
    } else {
      await mutateFollow();
    }
    await queryClient.invalidateQueries({ queryKey: ['suggested-users'] });
  }

  return (
    <Flex
      justify={'space-between'}
      alignItems={'center'}
      padding={'4px'}
      _hover={{ backgroundColor: 'outline' }}
      borderRadius={'10px'}
    >
      <Flex
        cursor={'pointer'}
        gap={'10px'}
        marginLeft={'10px'}
        width={'100%'}
        onClick={() => goToProfile(SuggestedFollowingUser.username ?? '')}
      >
        <Avatar
          src={`https://api.dicebear.com/9.x/micah/svg?seed=${SuggestedFollowingUser.profile.fullName}`}
          width={'40px'}
          height={'40px'}
          marginLeft={'-10px'}
        />
        <Flex direction={'column'}>
          <Text>{SuggestedFollowingUser.profile.fullName}</Text>
          <Text fontSize={'14px'} color={'gray.400'}>
            {SuggestedFollowingUser.username}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Button
          onClick={toggleFollow}
          width={isFollowing ? '100px' : '80px'}
          height={'30px'}
          border={isFollowing ? '1px solid white' : '1px solid gray'}
          backgroundColor={'transparent'}
          color={isFollowing ? 'gray.400' : 'white'}
          borderRadius={'20px'}
          _hover={{ backgroundColor: 'gray.600' }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Flex>
    </Flex>
  );
}
