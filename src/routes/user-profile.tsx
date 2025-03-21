import arrowLeftLogo from '@/assets/icons/arrow-left.svg';
import { Button } from '@/components/ui/button';
import UserProfile from '@/features/profile/components/user-profile';
import { api } from '@/libs/api';
import { Box, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { data: user } = useQuery({
    queryKey: ['user-profile', username],
    queryFn: async () => {
      const res = await api.get(`/users/username/${username}`);
      return res.data;
    },
    enabled: !!username,
  });

  function onBack() {
    navigate(-1);
  }

  return (
    <Box>
      <Box display={'flex'} gap={'10px'} padding={'30px 0px 10px 10px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={arrowLeftLogo} width={'27px'} />
        </Button>
        <Text fontSize={'2xl'}>{user?.profile.fullName}</Text>
      </Box>
      <UserProfile />
    </Box>
  );
}
