import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toaster';
import {
  RegisterSchema,
  RegisterSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();

  function onSubmit(data: RegisterSchemaDTO) {
    toaster.create({
      title: 'Registration is successfully!',
      type: 'success',
    });
    navigate('/login');

    console.log(data);
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Image src={Logo} width={'100px'}></Image>
        <Text fontSize={'28px'} fontWeight={'bold'}>
          Create accout Circle
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
        >
          Create
        </Button>
      </form>
      <Text fontWeight={'normal'}>
        Already have account?{' '}
        <ChakraLink asChild color={'brand'}>
          <Link to={'/login'}> Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
