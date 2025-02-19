import CoverProfile from '@/assets/icons/cover.svg';
import { Card, Flex, Image, Text } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { searchUserDatas } from '@/utils/fake-datas/search-users';

interface ProfileCardProps {
  username: string;
}

export default function ProfileCard({ username }: ProfileCardProps) {
  const user = searchUserDatas.find((u) => u.username === username);

  return (
    <Card.Root backgroundColor={'card'} width={'483px'}>
      <Card.Body gap={'8px'}>
        <Card.Title>My Profile</Card.Title>
        <Image src={CoverProfile} />
        <Flex justify={'space-between'} alignItems={'end'} marginTop={'-50px'}>
          <Avatar
            src={user?.avatarUrl}
            width={'90px'}
            height={'90px'}
            border={'4px solid black'}
            marginLeft={'20px'}
          />
          <Button
            width={'106px'}
            height={'30px'}
            border={'1px solid white'}
            backgroundColor={'transparent'}
            color={'white'}
            borderRadius={'20px'}
            _hover={{ backgroundColor: 'gray.600', transition: 'ease 0.4s' }}
          >
            Edit Profile
          </Button>
        </Flex>
        <Text fontSize={'24px'} fontWeight={'bold'}>
          ✨{user?.fullName}✨
        </Text>
        <Text color={'gray.400'} fontSize={'12px'}>
          {user?.username}
        </Text>
        <Text>{user?.bio || 'No bio available'}</Text>
        <Flex gap={'4px'}>
          <Text>291</Text>
          <Text color={'gray.400'}>Following</Text>
          <Text>32</Text>
          <Text color={'gray.400'}>Followers</Text>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
