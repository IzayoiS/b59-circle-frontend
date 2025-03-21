import { Avatar } from '@/components/ui/avatar';
import { api } from '@/libs/api';
import { Box, BoxProps, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchUser } from '../types/search-user';
import { isAxiosError } from 'axios';
import { toaster } from '@/components/ui/toaster';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
export interface SearchUserCardProps extends BoxProps {
  searchUserData: SearchUser;
  isFollowingList?: boolean;
  isFollowersList?: boolean;
}

export default function SearchUserCard({
  searchUserData,
  isFollowingList = false,
  isFollowersList = false,
  ...props
}: SearchUserCardProps) {
  const Navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    user: userLogin,
    incrementFollowingsCount,
    decrementFollowingsCount,
  } = useAuthStore();
  const [isFollowed, setIsFollowed] = useState(
    searchUserData?.isFollowed ?? false
  );
  useEffect(() => {
    setIsFollowed(searchUserData?.isFollowed ?? false);
  }, [searchUserData?.isFollowed]);

  const { mutateAsync: mutateFollow } = useMutation({
    mutationKey: ['follow'],
    mutationFn: async () => {
      const response = await api.post('/follow', {
        followedId: searchUserData.id,
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
      incrementFollowingsCount();
      await queryClient.invalidateQueries({ queryKey: ['followings'] });
      await queryClient.invalidateQueries({ queryKey: ['followers'] });
      await queryClient.invalidateQueries({ queryKey: ['search-users'] });
    },
  });

  const { mutateAsync: mutateUnfollow } = useMutation({
    mutationKey: ['unfollow'],
    mutationFn: async () => {
      if (!searchUserData.followedId) {
        throw new Error('Followed ID is missing!');
      }
      if (isFollowersList) {
        await api.delete(`/follow/${searchUserData.followedId}`);
      } else if (isFollowingList) {
        await api.delete(`/follow/${searchUserData.id}`);
      }
      // await api.delete(`/follow/${searchUserData.followedId}`);
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
      decrementFollowingsCount();
      await queryClient.invalidateQueries({ queryKey: ['followings'] });
      await queryClient.invalidateQueries({ queryKey: ['followers'] });
      await queryClient.invalidateQueries({ queryKey: ['search-users'] });
    },
  });

  async function toggleFollow() {
    console.log('Unfollow Request:', {
      followId: searchUserData.followedId,
      userId: searchUserData.id,
    });

    if (isFollowed) {
      await mutateUnfollow();
    } else {
      await mutateFollow();
    }
  }

  function goToProfile() {
    if (searchUserData.username === userLogin.username) {
      Navigate('/profile'); // Redirect ke halaman profil sendiri
    } else {
      Navigate(`/profile/${searchUserData.username}`);
    }
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      _hover={{ backgroundColor: 'card' }}
      margin={'8px 0px'}
      borderRadius={'10px'}
      {...props}
    >
      <Box
        display={'flex'}
        gap={'16px'}
        padding={'5px 0px'}
        marginTop={'10px'}
        onClick={goToProfile}
        cursor={'pointer'}
        width={'100%'}
      >
        <Avatar
          name={searchUserData.profile?.fullName}
          src={
            searchUserData.profile?.avatarUrl ||
            `https://api.dicebear.com/9.x/micah/svg?seed=${searchUserData.profile?.fullName}`
          }
          shape="full"
          size="full"
          width={'40px'}
          height={'40px'}
        />

        <Flex direction={'column'} flex={'10'}>
          <Text fontWeight={'bold'}>{searchUserData.profile?.fullName}</Text>
          <Text color={'secondary'}>@{searchUserData.username}</Text>
          <Text>{searchUserData.profile?.bio}</Text>
        </Flex>
      </Box>

      <Flex alignItems={'center'} marginRight={'10px'}>
        {searchUserData.id !== userLogin.id &&
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
      </Flex>
    </Box>
  );
}
