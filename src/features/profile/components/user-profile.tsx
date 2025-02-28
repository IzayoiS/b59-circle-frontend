import CoverProfile from '@/assets/icons/cover.svg';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import CardThreadUser from '@/features/home/components/card-thread-user';
import { postDatas } from '@/utils/fake-datas/posts';
import { searchUserDatas } from '@/utils/fake-datas/search-users';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();

  const user = searchUserDatas.find((u) => u.username === userId);
  const userPosts = postDatas.filter((post) => post.user.username === userId);

  return (
    <Box
      height={'100vh'}
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
          src={user?.profile.avatarUrl || ''}
          width={'100px'}
          height={'100px'}
          border={'2px solid black'}
          marginLeft={'20px'}
        />
        <Button
          width={'106px'}
          height={'30px'}
          border={'1px solid white'}
          backgroundColor={'transparent'}
          color={'white'}
          top={'-11px'}
          borderRadius={'20px'}
          _hover={{
            backgroundColor: 'gray.600',
            transition: 'ease 0.4s',
          }}
        >
          Edit Profile
        </Button>
      </Flex>
      <Text fontSize={'24px'} fontWeight={'bold'}>
        ✨{user?.profile.fullName}✨
      </Text>
      <Text color={'gray.400'} fontSize={'12px'}>
        @{user?.username}
      </Text>
      <Text>{user?.profile.bio || 'No bio available'}</Text>
      <Flex gap={'4px'}>
        <Text>291</Text>
        <Text color={'gray.400'}>Following</Text>
        <Text>32</Text>
        <Text color={'gray.400'}>Followers</Text>
      </Flex>

      {userPosts.length > 0 ? (
        userPosts.map((postData) => (
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
