import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { LoginSchema, LoginSchemaDTO } from '@/utils/schemas/auth.schemas';
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import dummyUsers from '@/utils/fake-datas/user.json';
import { toaster } from '@/components/ui/toaster';

export default function LoginForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();

  function onSubmit(data: LoginSchemaDTO) {
    const user = dummyUsers.find((dummyUser) => dummyUser.email === data.email);

    if (!user) {
      return toaster.create({
        title: 'email/password is wrong',
        type: 'error',
      });
    }

    if (user.password !== data.password) {
      return toaster.create({
        title: 'email/password is wrong',
        type: 'error',
      });
    }

    toaster.create({
      title: 'Login Successfully',
      type: 'success',
    });
    navigate({
      pathname: '/',
    });

    console.log(data);
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={Logo} width={'100px'}></Image>
      <Text fontSize={'28px'}>Login to Circle</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Field.Root invalid={!!errors.email?.message}>
          <Input
            placeholder="Email/Username"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            autoComplete="off"
            {...register('email')}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
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
        <Text
          fontWeight={'normal'}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <ChakraLink asChild outline={'none'}>
            <Link to={'/forgot-password'}> Forgot password?</Link>
          </ChakraLink>
        </Text>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'100%'}
          borderRadius={'20px'}
          fontSize={'20px'}
          type="submit"
        >
          Login
        </Button>
      </form>
      <Text fontWeight={'normal'}>
        Don't have an account yet?{' '}
        <ChakraLink asChild color={'brand'} outline={'none'}>
          <Link to={'/register'}> Create account</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
