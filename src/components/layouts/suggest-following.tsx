import { Flex, Text } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { useState } from 'react';

interface SuggestedFollowingProps {
  name: string;
  username: string;
  profilLogo: string;
  initialFollowing?: boolean;
}

export default function SuggestedFollowing({
  name,
  username,
  initialFollowing = false,
  profilLogo,
}: SuggestedFollowingProps) {
  const [following, setFollowing] = useState(initialFollowing);

  const onClickFollowing = () => setFollowing(!following);

  return (
    <Flex justify={'space-between'} alignItems={'center'} padding={'3px'}>
      <Flex gap={'10px'}>
        <Avatar
          src={`https://api.dicebear.com/9.x/micah/svg?seed=${profilLogo}`}
          width={'40px'}
          height={'40px'}
          marginLeft={'-10px'}
        />
        <Flex direction={'column'}>
          <Text>{name}</Text>
          <Text fontSize={'14px'} color={'gray.400'}>
            {username}
          </Text>
        </Flex>
      </Flex>
      <Button
        onClick={onClickFollowing}
        width={following ? '100px' : '80px'}
        height={'30px'}
        border={following ? '1px solid white' : '1px solid gray'}
        backgroundColor={'transparent'}
        color={following ? 'gray.400' : 'white'}
        borderRadius={'20px'}
        _hover={{ backgroundColor: 'gray.600' }}
      >
        {following ? 'Following' : 'Follow'}
      </Button>
    </Flex>
  );
}
