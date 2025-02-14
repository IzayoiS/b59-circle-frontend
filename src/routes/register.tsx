import RegisterForm from '@/features/auth/components/register-form';
import { Box } from '@chakra-ui/react';

export default function RegisterPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} paddingTop={'128px'}>
      <RegisterForm width={'412px'} />
    </Box>
  );
}
