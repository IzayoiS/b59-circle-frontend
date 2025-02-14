import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toaster';
import dummyUsers from '@/utils/fake-datas/user.json';
import {
  ResetPasswordScema,
  ResetPasswordScemaDTO,
} from '@/utils/schemas/auth.schemas';
import { Box, BoxProps, Field, Image, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPasswordForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordScemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(ResetPasswordScema),
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');

  function onSubmit(data: ResetPasswordScemaDTO) {
    const user = dummyUsers.find((dummyUser) => dummyUser.email === email);

    if (!user) {
      return toaster.create({
        title: 'Email is not valid!',
        type: 'error',
      });
    }

    if (user.password === data.password) {
      return toaster.create({
        title: 'Password cannot be same!',
        type: 'error',
      });
    }

    toaster.create({
      title: 'Reset password success!',
      type: 'success',
    });

    navigate({
      pathname: '/login',
    });

    console.log(data);
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={Logo} width={'100px'} />
      <Text fontSize={'28px'}>Reset password</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Field.Root invalid={!!errors.password?.message}>
          <Input
            placeholder="Password"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            type="password"
            {...register('password')}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.confirmPassword?.message}>
          <Input
            placeholder="Confirm new password"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            type="password"
            {...register('confirmPassword')}
          />
          <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'100%'}
          borderRadius={'20px'}
          fontSize={'20px'}
          type="submit"
        >
          Create New Password
        </Button>
      </form>
    </Box>
  );
}
