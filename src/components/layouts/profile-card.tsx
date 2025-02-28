import CoverProfile from '@/assets/icons/cover.svg';
import { Card, Flex, Image, Text } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import EditProfile from './edit-profile';
import { useAuthStore } from '@/stores/auth';

export default function ProfileCard() {
  const {
    username,
    profile: { followersCount, followingsCount, fullName, avatarUrl, bio },
  } = useAuthStore((state) => state.user);

  return (
    <Card.Root backgroundColor={'card'} width={'483px'}>
      <Card.Body gap={'8px'}>
        <Card.Title>My Profile</Card.Title>
        <Image src={CoverProfile} />
        <Flex justify={'space-between'} alignItems={'end'} marginTop={'-50px'}>
          <Avatar
            src={
              avatarUrl ||
              `https://api.dicebear.com/9.x/micah/svg?seed=${fullName}`
            }
            width={'90px'}
            height={'90px'}
            border={'4px solid black'}
            marginLeft={'20px'}
          />
          <EditProfile />
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
      </Card.Body>
    </Card.Root>
  );
}
