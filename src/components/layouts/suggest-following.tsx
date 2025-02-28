import { SearchUser } from '@/features/search-users/types/search-user';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

interface SuggestedFollowingProps {
  SuggestedFollowingUser: SearchUser;
  goToProfile: (username: string) => void;
}

export default function SuggestedFollowing({
  SuggestedFollowingUser,
  goToProfile,
}: SuggestedFollowingProps) {
  const [isFollowing, setIsFollowing] = useState(
    SuggestedFollowingUser.isFollowed
  );

  const onClickFollowing = () => setIsFollowing(!isFollowing);

  return (
    <Flex
      justify={'space-between'}
      alignItems={'center'}
      padding={'4px'}
      _hover={{ backgroundColor: 'outline' }}
      borderRadius={'10px'}
    >
      <Flex
        onClick={() => goToProfile(SuggestedFollowingUser.username)}
        cursor={'pointer'}
        gap={'10px'}
        marginLeft={'10px'}
        width={'100%'}
      >
        <Avatar
          src={`${SuggestedFollowingUser.profile.avatarUrl}`}
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
          onClick={onClickFollowing}
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
