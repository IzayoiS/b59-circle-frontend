import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form';

export default function ForgotPasswordForm(props: BoxProps) {
  const { errors, handleSubmit, isPending, onSubmit, register } =
    useForgotPasswordForm();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={Logo} width={'100px'} />
      <Text fontSize={'28px'}>Forgot password</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Field.Root invalid={!!errors.email?.message}>
          <Input
            placeholder="Email"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            autoComplete="off"
            {...register('email')}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'100%'}
          borderRadius={'20px'}
          fontSize={'20px'}
          type="submit"
          disabled={isPending ? true : false}
        >
          {isPending ? 'Loading...' : 'Send'}
        </Button>
      </form>
      <Text fontWeight={'normal'}>
        Already have account?{' '}
        <ChakraLink asChild color={'brand'} outline={'none'}>
          <Link to={'/login'}> Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
