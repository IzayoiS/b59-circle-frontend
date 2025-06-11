import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/use-login-form';

export default function LoginForm(props: BoxProps) {
  const { errors, handleSubmit, isPending, onSubmit, register } =
    useLoginForm();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={Logo} width={'100px'}></Image>
      <Text fontSize={'28px'}>Login to Circle</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Field.Root invalid={!!errors.identifier?.message}>
          <Input
            placeholder="Email/Username"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            autoComplete="off"
            {...register('identifier')}
          />
          <Field.ErrorText>{errors.identifier?.message}</Field.ErrorText>
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
          disabled={isPending ? true : false}
        >
          {isPending ? <Spinner /> : 'Login'}
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
