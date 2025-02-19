import SearchUserCard from '@/features/search-users/components/search-user-card';
import { searchUserDatas } from '@/utils/fake-datas/search-users';
import { Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function Follows() {
  const [value, setValue] = useState<string | null>('followers');

  const randomFollowers = shuffleArray(searchUserDatas);
  const following = searchUserDatas.filter((user) => user.isFollowed);

  function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  return (
    <Tabs.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      padding={'10px 20px'}
    >
      <Tabs.List width={'100%'}>
        <Tabs.Trigger
          value="followers"
          width={'50%'}
          display={'flex'}
          justifyContent={'center'}
        >
          Followers
        </Tabs.Trigger>
        <Tabs.Trigger
          value="following"
          width={'50%'}
          display={'flex'}
          justifyContent={'center'}
        >
          Following
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="followers">
        {randomFollowers.length > 0 ? (
          randomFollowers.map((user) => (
            <SearchUserCard key={user.id} searchUserData={user} />
          ))
        ) : (
          <Text>No followers yet.</Text>
        )}
      </Tabs.Content>

      <Tabs.Content value="following">
        {following.length > 0 ? (
          following.map((user) => (
            <SearchUserCard key={user.id} searchUserData={user} />
          ))
        ) : (
          <Text>You are not following anyone yet.</Text>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
