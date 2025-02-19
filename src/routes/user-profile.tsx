import arrowLeftLogo from '@/assets/icons/arrow-left.svg';
import { Button } from '@/components/ui/button';
import UserProfile from '@/features/profile/components/user-profile';
import { searchUserDatas } from '@/utils/fake-datas/search-users';
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const user = searchUserDatas.find((u) => u.username === userId);

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
        <Text fontSize={'2xl'}>{user?.fullName}</Text>
      </Box>
      <UserProfile />
    </Box>
  );
}
