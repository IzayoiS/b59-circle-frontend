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
import { useRegisterForm } from '../hooks/use-register-form';

export default function RegisterForm(props: BoxProps) {
  const { errors, handleSubmit, isPending, onSubmit, register } =
    useRegisterForm();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Image src={Logo} width={'100px'}></Image>
        <Text fontSize={'28px'} fontWeight={'bold'}>
          Create account Circle
        </Text>
        <Field.Root invalid={!!errors.fullName?.message}>
          <Input
            placeholder="Full Name"
            outline={'none'}
            autoComplete="off"
            border={'1px solid'}
            borderColor={'outline'}
            {...register('fullName')}
          />
          <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.username?.message}>
          <Input
            placeholder="username"
            outline={'none'}
            autoComplete="off"
            border={'1px solid'}
            borderColor={'outline'}
            {...register('username')}
          />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.email?.message}>
          <Input
            placeholder="Email"
            outline={'none'}
            autoComplete="off"
            border={'1px solid'}
            borderColor={'outline'}
            {...register('email')}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.password?.message}>
          <Input
            placeholder="Password"
            type="password"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            {...register('password')}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
          {isPending ? <Spinner /> : 'Register'}
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
