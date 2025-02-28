import CoverProfile from '@/assets/icons/cover.svg';
import EditProfile from '@/components/layouts/edit-profile';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import CardThreadProfile from '@/features/home/components/card-thread-profile';
import { useAuthStore } from '@/stores/auth';
import { postDatas } from '@/utils/fake-datas/posts';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

export default function Profile() {
  const {
    username,
    profile: { followersCount, followingsCount, fullName, avatarUrl, bio },
  } = useAuthStore((state) => state.user);

  const userPosts = postDatas.filter((post) => post.user.username);

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
        ✨{fullName}✨
      </Text>
      <Image src={CoverProfile} />
      <Flex justify={'space-between'} alignItems={'end'} marginTop={'-60px'}>
        <Avatar
          src={
            avatarUrl ||
            `https://api.dicebear.com/9.x/micah/svg?seed=${fullName}`
          }
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
          <EditProfile />
        </Button>
      </Flex>
      <Text fontSize={'24px'} fontWeight={'bold'}>
        ✨{fullName}✨
      </Text>
      <Text color={'gray.400'} fontSize={'12px'}>
        @{username}
      </Text>
      <Text>{bio || 'No bio available'}</Text>
      <Flex gap={'4px'}>
        <Text>{followingsCount}</Text>
        <Text color={'gray.400'}>Following</Text>
        <Text>{followersCount}</Text>
        <Text color={'gray.400'}>Followers</Text>
      </Flex>
      {userPosts.length > 0 ? (
        userPosts
          .filter((user) => user.user.username == 'iqbal_hasbi')
          .map((postData) => (
            <CardThreadProfile
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
