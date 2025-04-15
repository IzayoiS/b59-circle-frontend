import SearchLogoOutline from '@/assets/icons/user-search-outline.svg';
import { InputGroup } from '@/components/ui/input-group';
import { Box, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchUser } from '../types/search-user';
import SearchUserCard from './search-user-card';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';

export default function SearchUsers() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounced] = useDebounce(searchText, 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery<SearchUser[]>({
    queryKey: ['search-users'],
    queryFn: async () => {
      const response = await api.get(`/users?search=${searchTextDebounced}`);
      return response.data;
    },
    enabled: !!searchTextDebounced,
  });

  useEffect(() => {
    refetch();
  }, [searchTextDebounced, refetch]);

  return (
    <Box padding={'30px 20px'}>
      <InputGroup
        width={'100%'}
        startElement={
          <Image
            src={SearchLogoOutline}
            width={'20px'}
            margin={'20px 0px 20px -4px'}
          />
        }
      >
        <Input
          placeholder="Search your friend"
          outline={'none'}
          border={'none'}
          padding={'10px'}
          borderColor={'outline'}
          backgroundColor={'outline'}
          borderRadius={'20px'}
          _focus={{
            borderColor: 'brand',
          }}
          onChange={handleChange}
        />
      </InputGroup>
      {!searchTextDebounced && isLoading && <Spinner />}{' '}
      {
        <Flex
          justify={'center'}
          direction={'column'}
          align={'center'}
          height={'80vh'}
        >
          <Text marginTop={'16px'} fontSize={'20px'}>
            Write and search something
          </Text>
          <Text
            color={'secondary'}
            maxWidth="380px"
            whiteSpace="pre-line"
            textAlign={'center'}
          >
            Try searching for something else or check the spelling of what you
            typed.
          </Text>
        </Flex>
      }
      {searchTextDebounced && users.length > 0 && (
        <Box marginTop={'20px'}>
          {users.map((follower) => (
            <SearchUserCard
              searchUserData={{
                ...follower,
                isFollowed: follower.isFollowed,
                followedId: follower.id,
              }}
              key={follower.id}
              isFollowingList={true}
            />
          ))}
        </Box>
      )}
      {searchTextDebounced && !isLoading && users?.length === 0 && (
        <Flex
          justify={'center'}
          direction={'column'}
          align={'center'}
          height={'80vh'}
        >
          <Text marginTop={'16px'} fontSize={'20px'}>
            No result for "{searchTextDebounced}"
          </Text>
          <Text
            color={'secondary'}
            maxWidth="380px"
            whiteSpace="pre-line"
            textAlign={'center'}
          >
            Try searching for something else or check the spelling of what you
            typed.
          </Text>
        </Flex>
      )}
    </Box>
  );
}
