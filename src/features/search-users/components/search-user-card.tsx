import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Flex, Text } from '@chakra-ui/react';
import { SearchUser } from '../types/search-user';
import { useNavigate } from 'react-router-dom';

export interface SearchUserCardProps extends BoxProps {
  searchUserData: SearchUser;
}

export default function SearchUserCard({
  searchUserData,
  ...props
}: SearchUserCardProps) {
  const Navigate = useNavigate();

  function goToProfile() {
    Navigate(`/profile/${searchUserData.username}`);
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
          name={searchUserData.profile.fullName}
          src={searchUserData.profile.avatarUrl ?? ''}
          shape="full"
          size="full"
          width={'40px'}
          height={'40px'}
        />

        <Flex direction={'column'} flex={'10'}>
          <Text fontWeight={'bold'}>{searchUserData.profile.fullName}</Text>
          <Text color={'secondary'}>@{searchUserData.username}</Text>
          <Text>{searchUserData.profile.bio}</Text>
        </Flex>
      </Box>

      <Flex alignItems={'center'} marginRight={'10px'}>
        <Button
          // width={searchUserData.isFollowed ? '100px' : '80px'}
          height={'30px'}
          // border={
          //   searchUserData.isFollowed ? '1px solid white' : '1px solid gray'
          // }
          backgroundColor={'transparent'}
          // color={searchUserData.isFollowed ? 'gray.400' : 'white'}
          borderRadius={'20px'}
          _hover={{ backgroundColor: 'gray.600' }}
          // onClick={() => {
          //   searchUserData.isFollowed = !searchUserData.isFollowed;
          //   forceUpdate();
          // }}
        >
          {/* {searchUserData.isFollowed ? 'Following' : 'Follow'} */}
        </Button>
      </Flex>
    </Box>
  );
}
