import CoverProfile from '@/assets/icons/cover.svg';
import { Avatar } from '@/components/ui/avatar';
import FollowButton from '@/features/follows/components/follow-button';
import CardThreadUser from '@/features/home/components/card-thread-user';
import { Thread } from '@/features/home/types/posts';
import { api } from '@/libs/api';
import {
  Box,
  // Button
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();

  const { data: user, refetch } = useQuery({
    queryKey: ['user-profile', username],
    queryFn: async () => {
      const res = await api.get(`/users/username/${username}`);
      return res.data;
    },
    enabled: !!username,
  });
  const handleFollowChange = async () => {
    await refetch();
  };

  const { data: userPosts = [] } = useQuery<Thread[]>({
    queryKey: ['user-posts', user?.id],
    queryFn: async () => {
      const res = await api.get(`/threads/user/${user?.id}`);
      return res.data;
    },
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <Flex justify="center" direction="column" align="center" height="80vh">
        <Text fontSize="20px">User not found</Text>
      </Flex>
    );
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'16px'}
      borderLeft={'1px solid'}
      borderColor={'outline'}
      padding={'30px'}
    >
      <Text fontSize={'28px'} fontWeight={'medium'}>
        ✨{user?.profile.fullName}✨
      </Text>
      <Image src={CoverProfile} />
      <Flex justify={'space-between'} alignItems={'end'} marginTop={'-60px'}>
        <Avatar
          src={
            user?.profile.avatarUrl ||
            `https://api.dicebear.com/9.x/micah/svg?seed=${user.profile.fullName}`
          }
          width={'100px'}
          height={'100px'}
          border={'2px solid black'}
          marginLeft={'20px'}
        />
        <FollowButton
          followsData={user}
          key={user.id}
          isFollowingList={true}
          onFollowChange={handleFollowChange}
        />
      </Flex>
      <Text fontSize={'24px'} fontWeight={'bold'}>
        ✨{user?.profile.fullName}✨
      </Text>
      <Text color={'gray.400'} fontSize={'12px'}>
        @{user?.username}
      </Text>
      <Text>{user?.profile.bio || 'No bio available'}</Text>
      <Flex gap={'4px'}>
        <Text>{user?.followersCount}</Text>
        <Text color={'gray.400'}>Followers</Text>
        <Text>{user?.followingsCount}</Text>
        <Text color={'gray.400'}>Following</Text>
      </Flex>

      {(userPosts ?? []).length > 0 ? (
        (userPosts ?? []).map((postData) => (
          <CardThreadUser
            margin={'0px -30px 0px -30px'}
            key={postData.id}
            postData={postData}
          />
        ))
      ) : (
        <Text>No posts yet.</Text>
      )}
    </Box>
  );
}
