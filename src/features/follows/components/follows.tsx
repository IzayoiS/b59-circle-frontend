import SearchUserCard from '@/features/search-users/components/search-user-card';
import { Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useFollowers, useFollowings } from '../hooks/useFollowService';
import { defaultProfile } from '@/entities/profile.entity';

export default function Follows() {
  const [value, setValue] = useState<string | null>('followers');

  const { data: followersData } = useFollowers();
  const { data: followingsData } = useFollowings();

  console.log('Followers Data:', followersData);
  console.log('Followings Data:', followingsData);

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
        {Array.isArray(followersData?.followers) &&
        followersData.followers.length > 0 ? (
          followersData.followers.map(({ following, isFollowed, id }) =>
            following?.id ? (
              <SearchUserCard
                key={`follower-${following.id}`}
                searchUserData={{
                  ...following,
                  isFollowed,
                  followedId: id,

                  profile: { ...defaultProfile, ...following.profile },
                }}
                isFollowersList={true}
              />
            ) : null
          )
        ) : (
          <Text>No followers yet.</Text>
        )}
      </Tabs.Content>

      <Tabs.Content value="following">
        {Array.isArray(followingsData?.followings) &&
        followingsData.followings.length > 0 ? (
          followingsData.followings.map(({ followed, isFollowed, id }) =>
            followed?.id ? (
              <SearchUserCard
                key={`following-${followed.id}`}
                searchUserData={{
                  ...followed,
                  isFollowed,
                  followedId: id,
                  profile: { ...defaultProfile, ...followed.profile },
                }}
                isFollowingList={true}
              />
            ) : null
          )
        ) : (
          <Text>You are not following anyone yet.</Text>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
