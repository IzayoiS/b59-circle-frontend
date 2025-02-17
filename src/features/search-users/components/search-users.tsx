import SearchLogoOutline from '@/assets/icons/user-search-outline.svg';
import { InputGroup } from '@/components/ui/input-group';
import { searchUserDatas } from '@/utils/fake-datas/search-users';
import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchUser } from '../types/search-user';
import SearchUserCard from './search-user-card';

export default function SearchUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounced] = useDebounce(searchText, 500);
  const [searchUserDataInterval, setSearchUserDataInterval] = useState<
    SearchUser[]
  >([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function getSearchUserDatas() {
    setTimeout(() => {
      setSearchUserDataInterval(searchUserDatas);
      setIsLoading(false);
    }, 1500);
  }

  const filteredUsers = searchUserDataInterval.filter((user) =>
    user.fullName
      .toLowerCase()
      .includes(searchTextDebounced.toLowerCase().trim())
  );

  useEffect(() => {
    getSearchUserDatas();
  }, []);

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

      {!searchTextDebounced && (
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
      )}

      {searchTextDebounced &&
        !isLoading &&
        filteredUsers.length > 0 &&
        filteredUsers.map((user) => (
          <SearchUserCard searchUserData={user} key={user.id} />
        ))}

      {searchTextDebounced && !isLoading && filteredUsers.length === 0 && (
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
