import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Flex, Text } from '@chakra-ui/react';
import { useReducer } from 'react';
import { SearchUser } from '../types/search-user';

interface SearchUserCardProps extends BoxProps {
  searchUserData: SearchUser;
}

export default function SearchUserCard({
  searchUserData,
  ...props
}: SearchUserCardProps) {
  const [, forceUpdate] = useReducer((state) => state + 1, 0);

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      padding={'5px 0px'}
      marginTop={'10px'}
      {...props}
    >
      <Avatar
        name={searchUserData.fullName}
        src={searchUserData.avatarUrl}
        shape="full"
        size="full"
        width={'40px'}
        height={'40px'}
      />

      <Flex direction={'column'} flex={'10'}>
        <Text fontWeight={'bold'}>{searchUserData.fullName}</Text>
        <Text color={'secondary'}>@{searchUserData.username}</Text>
        <Text>{searchUserData.bio}</Text>
      </Flex>
      <Flex alignItems={'center'}>
        <Button
          width={searchUserData.isFollowed ? '100px' : '80px'}
          height={'30px'}
          border={
            searchUserData.isFollowed ? '1px solid white' : '1px solid gray'
          }
          backgroundColor={'transparent'}
          color={searchUserData.isFollowed ? 'gray.400' : 'white'}
          borderRadius={'20px'}
          _hover={{ backgroundColor: 'gray.600' }}
          onClick={() => {
            searchUserData.isFollowed = !searchUserData.isFollowed;
            forceUpdate();
          }}
        >
          {searchUserData.isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </Flex>
    </Box>
  );
}
