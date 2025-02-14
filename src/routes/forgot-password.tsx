import ForgotPasswordForm from '@/features/auth/components/forgot-password-form';
import { Box } from '@chakra-ui/react';

export default function ForgotPasswordPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} paddingTop={'128px'}>
      <ForgotPasswordForm width={'412px'} />
    </Box>
  );
}
